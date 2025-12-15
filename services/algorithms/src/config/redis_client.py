import logging
import redis

logger = logging.getLogger(__name__)

_redis_client = None

def connect_redis(host: str, port: int) -> redis.Redis:
    global _redis_client
    
    if _redis_client is not None:
        return _redis_client
    
    try:
        _redis_client = redis.Redis(
            host=host,
            port=port,
            decode_responses=True,
            socket_connect_timeout=5
        )
        _redis_client.ping()
        logger.info(f'Connected to Redis at {host}:{port}')
        return _redis_client
    except Exception as e:
        logger.error(f'Redis connection error: {e}')
        raise

def get_redis_client() -> redis.Redis:
    if _redis_client is None:
        raise RuntimeError('Redis client not connected')
    return _redis_client

def close_redis():
    global _redis_client
    if _redis_client:
        _redis_client.close()
        _redis_client = None
        logger.info('Redis connection closed')
