import logging
from pymongo import MongoClient
from pymongo.database import Database

logger = logging.getLogger(__name__)

_client = None
_db = None

def connect_database(uri: str) -> Database:
    global _client, _db
    
    if _db is not None:
        return _db
    
    try:
        _client = MongoClient(uri)
        db_name = uri.split('/')[-1].split('?')[0] or 'monorepo'
        _db = _client[db_name]
        
        _client.admin.command('ping')
        logger.info(f'Connected to MongoDB database: {db_name}')
        return _db
    except Exception as e:
        logger.error(f'MongoDB connection error: {e}')
        raise

def get_database() -> Database:
    if _db is None:
        raise RuntimeError('Database not connected')
    return _db

def close_database():
    global _client, _db
    if _client:
        _client.close()
        _client = None
        _db = None
        logger.info('MongoDB connection closed')
