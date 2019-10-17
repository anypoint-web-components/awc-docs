const express = require('express');
const { BaseApi } = require('./base-api');
const logging = require('../lib/logging');
const bodyParser = require('body-parser');
const https = require('https');
const config = require('../config');

const router = express.Router();
router.use(bodyParser.json());

const apiBase = 'https://anypoint.mulesoft.com/accounts/api';
const tokenEndpoint = `${apiBase}/v2/oauth2/token`;

// gcloud container clusters get-credentials awc-www --zone us-central1-a
// kubectl create secret generic anypoint-oauth /
//  --from-literal clientSecret=... --from-literal clientId=...
// gcloud config set project advancedrestclient-1155

/**
 * A route that support authorization for anypoint-signing button demo page.
 * @extends BaseApi
 */
class AuthApiRoute extends BaseApi {
  /**
   * Exchanges authorization code for access token in Anypoint service.
   * The request body must contain:
   * - code - received authorization code.
   * - redirectUri - The redirect URL used with the original request
   * - clientId - Application client id
   *
   * The application keeps client secret in K8 secret store and the secret is
   * accessible from kuberneties engine.
   *
   * @param {Object} req
   * @param {Object} res
   */
  async anypointTokenRequest(req, res) {
    const { body } = req;
    if (!body || typeof body !== 'object') {
      this.sendError(res, 'Missing payload message');
      return;
    }
    const { code, redirectUri, clientId } = body;
    const missing = [];
    if (!code) {
      missing[missing.length] = 'code';
    }
    if (!redirectUri) {
      missing[missing.length] = 'redirectUri';
    }
    if (!clientId) {
      missing[missing.length] = 'clientId';
    }
    if (missing.length) {
      this.sendError(res, `Missing required property: ${missing.join(', ')}`);
      return;
    }
    try {
      const data = await this._exchangeTokens(code, clientId, redirectUri);
      res.status(200).send({
        error: false,
        data,
      });
    } catch (e) {
      this.sendError(res, e.message);
    }
  }
  /**
   * Exchanges code for access token.
   * @param {String} code Received authrization code
   * @param {String} cid Client ID.
   * @param {?String} redirectUri Redirect URI
   * @return {Promise}
   */
  async _exchangeTokens(code, cid, redirectUri) {
    const body = this._getTokenExchangeBody(code, cid, redirectUri);
    const headers = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    const [mediaType, rawBody] =
      await this._makeRequest(tokenEndpoint, 'POST', headers, body);
    return this._processCodeResponse(rawBody, mediaType);
  }
  /**
   * Replaces `-` or `_` with camel case.
   * @param {String} name The string to process
   * @return {String|undefined} Camel cased string or `undefined` if not
   * transformed.
   */
  _camel(name) {
    let i = 0;
    let l;
    let changed = false;
    while ((l = name[i])) {
      if ((l === '_' || l === '-') && i + 1 < name.length) {
        name = name.substr(0, i) +
          name[i + 1].toUpperCase() +
          name.substr(i + 2);
        changed = true;
      }
      i++;
    }
    return changed ? name : undefined;
  }
  /**
   * Processes token request body and produces map of values.
   *
   * @param {String} body Body received in the response.
   * @param {String} contentType Response content type.
   * @return {Object} Response as an object.
   * @throws {Error} Exception when body is invalid.
   */
  _processCodeResponse(body, contentType) {
    if (!body) {
      throw new Error('Code response body is empty.');
    }
    let tokenInfo;
    if (contentType.indexOf('json') !== -1) {
      tokenInfo = JSON.parse(body);
      Object.keys(tokenInfo).forEach((name) => {
        const camelName = this._camel(name);
        if (camelName) {
          tokenInfo[camelName] = tokenInfo[name];
        }
      });
    } else {
      tokenInfo = {};
      body.split('&').forEach((p) => {
        const item = p.split('=');
        const name = item[0];
        const camelName = this._camel(name);
        const value = decodeURIComponent(item[1]);
        tokenInfo[name] = value;
        tokenInfo[camelName] = value;
      });
    }
    return tokenInfo;
  }

  /**
   * Creates message body for OAuth token exchange
   * @param {String} code Received authrization code
   * @param {String} cid Client ID.
   * @param {?String} redirectUri Redirect URI
   * @return {String}
   */
  _getTokenExchangeBody(code, cid, redirectUri) {
    const parts = [];
    parts[parts.length] = ['grant_type', 'authorization_code'];
    parts[parts.length] = ['client_id', cid];
    parts[parts.length] = ['code', code];
    if (redirectUri) {
      parts[parts.length] = ['redirect_uri', redirectUri];
    }
    if (cid === config.get('ANYPOINT_CLIENT_ID')) {
      parts[parts.length] = ['client_secret',
        config.get('ANYPOINT_CLIENT_SECRET')];
    } else {
      parts[parts.length] = ['client_secret', ''];
    }
    return parts
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
  }
  /**
   * Makes a request to Anypoint authorization server.
   * @param {String} url URL to connect to
   * @param {String} method HTTP method
   * @param {Object} headers HTTP headers
   * @param {String} body
   * @return {Promise}
   */
  _makeRequest(url, method, headers, body) {
    const options = {
      method,
      headers,
    };
    return new Promise((resolve, reject) => {
      const req = https.request(url, options, (res) => {
        const { statusCode } = res;
        if (statusCode >= 500) {
          const message = 'Authorization server error.';
          reject(new Error(message));
          return;
        }
        res.setEncoding('utf8');
        const contentType = res.headers['content-type'];
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (statusCode >= 400 && statusCode < 500) {
            reject(new Error(`Client error: ${data}`));
          } else {
            resolve([contentType, data]);
          }
        });
      });
      req.on('error', (e) => {
        reject(e.message);
        logging.error(e);
      });
      if (body) {
        req.write(body);
      }
      req.end();
    });
  }
}

const api = new AuthApiRoute();
api.setCors(router);
api.wrapApi(router, [
  ['/anypoint-token', 'anypointTokenRequest', 'post'],
]);
module.exports = router;
