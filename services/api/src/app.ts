import cors from 'cors';
import express, { Application, json, urlencoded } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import apiRouter from './routes';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
