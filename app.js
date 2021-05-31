/* eslint-disable arrow-body-style */
import { start as traceStart } from '@google-cloud/trace-agent';
import { start as debugStart } from '@google-cloud/debug-agent';
import express from 'express';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import serveStatic from 'serve-static';
import config from './config.js';
import { requestLogger, errorLogger, logger } from './lib/logging.js';
import { requiresHttpsRedirect } from './lib/Utils.js';
import ApiRoute from './api/index.js';

const IS_PRODUCTION = config.get('NODE_ENV') === 'production';

if (IS_PRODUCTION) {
  traceStart();
  debugStart();
}

const app = express();
export default app;

app.disable('etag');
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(requestLogger);
app.use(compression());
app.use(express.static('dist'));

app.get('/_ah/health', (req, res) => {
  res.status(200).send('ok');
});

// recognizes (?) http traffic and redirects it to HTTPS.
app.use((req, res, next) => {
  try {
    if (requiresHttpsRedirect(req)) {
      const { host } = req.headers;
      const newUrl = `https://${host}${req.url}`;
      res.redirect(301, newUrl);
      return;
    }
  } catch (e) {
    // ...
  }
  next();
});

// API
app.use('/api/v1/', ApiRoute);

const buildServe = serveStatic('dist', {
  extensions: ['html'],
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const demoDev = (req, res) => {
  return () => {
    const index = path.join('dist', 'index.html');
    fs.readFile(index, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send({
          error: 'Unable to read demo app index file',
        });
      } else {
        res.set('Content-Type', 'text/html');
        res.send(data);
      }
    });
  };
};

app.get('*', (req, res) => {
  buildServe(req, res, demoDev(req, res));
});

// Add the error logger after all middleware and routes so that
// it can log errors from the whole application. Any custom error
// handlers should go after this.
app.use(errorLogger);

let serverResolve;
export const serverStartPromise = new Promise((resolve) => {
  serverResolve = resolve;
});

const server = app.listen(config.get('PORT'), () => {
  // @ts-ignore
  const { port } = server.address();
  logger.info(`App listening on port ${port}`);
  serverResolve();
});

export { server };
