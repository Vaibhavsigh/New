import os
import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

from .config.database import connect_database
from .config.redis_client import connect_redis
from .routes import register_routes

load_dotenv()

logging.basicConfig(
    level=getattr(logging, os.getenv('LOG_LEVEL', 'INFO')),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['MONGO_URI'] = os.getenv('MONGO_URI', 'mongodb://localhost:27017/monorepo')
    app.config['REDIS_HOST'] = os.getenv('REDIS_HOST', 'localhost')
    app.config['REDIS_PORT'] = int(os.getenv('REDIS_PORT', 6379))

    with app.app_context():
        try:
            connect_database(app.config['MONGO_URI'])
            logger.info('Database connected successfully')
        except Exception as e:
            logger.error(f'Database connection failed: {e}')

        try:
            connect_redis(app.config['REDIS_HOST'], app.config['REDIS_PORT'])
            logger.info('Redis connected successfully')
        except Exception as e:
            logger.error(f'Redis connection failed: {e}')

    @app.route('/health', methods=['GET'])
    def health():
        return jsonify({
            'status': 'ok',
            'service': 'algorithms',
            'timestamp': str(os.times())
        }), 200

    register_routes(app)

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'success': False, 'error': 'Not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        logger.error(f'Internal error: {error}')
        return jsonify({'success': False, 'error': 'Internal server error'}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')
    app.run(host=host, port=port, debug=os.getenv('FLASK_ENV') == 'development')
