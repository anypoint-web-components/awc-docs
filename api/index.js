const express = require('express');
const logging = require('../lib/logging');

const router = express.Router();

// Test scheduling route
router.use('/auth', require('./auth-api'));
// Errors
router.use((req, res) => {
  const message = `Route ${req.url} not found`;
  logging.warn(message);
  res.status(404).send({
    error: true,
    message,
  });
});

router.use((err, req, res) => {
  logging.error(err);
  res.send({
    error: true,
    message: 'There was an error. That is all we can share.',
  });
});

module.exports = router;
