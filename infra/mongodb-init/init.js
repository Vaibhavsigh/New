/* global db:writable, print */
db = db.getSiblingDB('monorepo');

db.createCollection('users');
db.createCollection('sessions');

db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });

db.sessions.createIndex({ userId: 1 });
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

print('MongoDB initialized successfully');
