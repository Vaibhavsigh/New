import logging
from flask import Blueprint, jsonify, request
import numpy as np

logger = logging.getLogger(__name__)

algorithms_bp = Blueprint('algorithms', __name__)

@algorithms_bp.route('/process', methods=['POST'])
def process_data():
    try:
        data = request.get_json()
        
        if not data or 'values' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing values in request body'
            }), 400
        
        values = np.array(data['values'])
        
        result = {
            'success': True,
            'data': {
                'mean': float(np.mean(values)),
                'std': float(np.std(values)),
                'min': float(np.min(values)),
                'max': float(np.max(values)),
                'count': len(values)
            }
        }
        
        return jsonify(result), 200
    except Exception as e:
        logger.error(f'Error processing data: {e}')
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@algorithms_bp.route('/status', methods=['GET'])
def status():
    return jsonify({
        'success': True,
        'data': {
            'status': 'ready',
            'algorithms_available': ['process']
        }
    }), 200
