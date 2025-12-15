import { MongoClient, Db } from 'mongodb';

import logger from './logger';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/monorepo';

  try {
    client = new MongoClient(uri);
    await client.connect();

    const dbName = new URL(uri).pathname.slice(1) || 'monorepo';
    db = client.db(dbName);

    logger.info(`Connected to MongoDB database: ${dbName}`);
    return db;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    logger.info('MongoDB connection closed');
  }
}
