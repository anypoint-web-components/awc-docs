const nconf = require('nconf');
const path = require('path');

module.exports = nconf;

nconf
// 1. Command-line arguments
    .argv()
// 2. Environment variables
    .env([
    // 'CLOUD_BUCKET',
      'GCLOUD_PROJECT',
      'PORT',
      'ANYPOINT_CLIENT_SECRET',
      'ANYPOINT_CLIENT_ID',
    ])
// 3. Config file
    .file({ file: path.join(__dirname, 'config.json') })
// 4. Defaults
    .defaults({
      GCLOUD_PROJECT: '',
      PORT: 8080,
    });
/**
 * Checks if configuration key is set.
 * @param {String} setting
 */
function checkConfig(setting) {
  if (!nconf.get(setting)) {
    throw new Error(`${setting} variable is missing.`);
  }
}

// Check for required settings
checkConfig('GCLOUD_PROJECT');
checkConfig('PORT');
checkConfig('ANYPOINT_CLIENT_SECRET');
checkConfig('ANYPOINT_CLIENT_ID');
