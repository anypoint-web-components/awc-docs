import nconf from 'nconf';
import path from 'path';

const configFile = path.join(import.meta.url.replace('file:/', ''), '..', 'config.json');

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    // 'CLOUD_BUCKET',
    'PROJECT_ID',
    'PORT',
    'ANYPOINT_CLIENT_SECRET',
    'ANYPOINT_CLIENT_ID',
  ])
  // 3. Application config file
  .file({ file: configFile })
  // 4. Defaults
  .defaults({
    PROJECT_ID: '',
    PORT: 8080,
  });

export default nconf;
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
checkConfig('PROJECT_ID');
checkConfig('PORT');
checkConfig('ANYPOINT_CLIENT_SECRET');
checkConfig('ANYPOINT_CLIENT_ID');
