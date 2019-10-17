/* eslint global-require: 0 */
/* eslint no-empty: 0 */
/* eslint no-console: 0 */

// Activate Google Cloud Trace and Debug when in production
if (process.env.NODE_ENV === 'production') {
  try {
    require('@google-cloud/trace-agent').start();
    require('@google-cloud/debug-agent').start();
  } catch (_) {}
}

const express = require('express');
const compression = require('compression');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const logging = require('./lib/logging');

const app = express();
app.disable('etag');
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(logging.requestLogger);
app.use(compression());
app.use(express.static('dist'));

app.get('/_ah/health', (req, res) => {
  res.status(200).send('ok');
});

app.use('/api/v1', require('./api'));

app.get('*', (req, res) => {
  const index = path.join('dist', 'index.html');
  fs.readFile(index, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({
        error: 'Unable to read index file',
      });
    } else {
      res.set('Content-Type', 'text/html');
      res.send(data);
    }
  });
});

if (module === require.main) {
  // Start the server
  const server = app.listen(config.get('PORT'), () => {
    const { port } = server.address();
    console.log(`App is listening on port ${port}`);
  });
}

module.exports = app;
