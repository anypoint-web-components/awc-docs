import express from 'express';
import { logger } from '../lib/logging.js';
import AuthRoute from './AuthApi.js';

const router = express.Router();
export default router;

router.use('/auth', AuthRoute);

// Errors
router.use((req, res) => {
  const message = `Route ${req.url} not found`;
  logger.warn(message);
  res.status(404).send({
    error: true,
    message,
  });
});
