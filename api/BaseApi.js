import cors from 'cors';

/** @typedef {import('express').Response} Response */
/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Router} Router */

/**
 * A base class for all API routes
 */
export class BaseApi {
  /**
   * @constructor
   */
  constructor() {
    this._processCors = this._processCors.bind(this);
  }

  /**
   * Sets CORS on all routes for `OPTIONS` HTTP method.
   * @param {Router} router Express app.
   */
  setCors(router) {
    // @ts-ignore
    router.options('*', cors(this._processCors));
  }

  /**
   * Shorthand function to register a route on this class.
   * @param {Router} router Express app.
   * @param {Array<Array<String>>} routes List of routes. Each route is an array
   * where:
   * - index `0` is the API route, eg, `/api/models/:modelId`
   * - index `1` is the function name to call
   * - index `2` is optional and describes HTTP method. Defaults to 'get'.
   * It must be lowercase.
   */
  wrapApi(router, routes) {
    for (let i = 0, len = routes.length; i < len; i++) {
      const route = routes[i];
      const method = route[2] || 'get';
      const clb = this[route[1]].bind(this);
      router[method](route[0], cors(this._processCors), clb);
    }
  }

  /**
   * Sends error to the client in a standardized way.
   * @param {Response} res HTTP response object
   * @param {String} message Error message to send.
   * @param {Number=} [status=400] HTTP status code, default to 400.
   */
  sendError(res, message, status = 400) {
    res.status(status).send({
      error: true,
      message,
    });
  }

  /**
   * Processes CORS request.
   * @param {Request} req
   * @param {Function} callback
   */
  _processCors(req, callback) {
    const whitelist = [
      'https://app.apimodeling.io',
      'https://apimodeling.io',
    ];
    const origin = req.header('Origin');
    let corsOptions;
    if (!origin) {
      corsOptions = { origin: false };
    } else if (origin.includes('http://localhost:') || origin.includes('http://127.0.0.1:')) {
      corsOptions = { origin: true };
    } else if (whitelist.includes(origin)) {
      corsOptions = { origin: true };
    }
    if (corsOptions) {
      // @ts-ignore
      corsOptions.credentials = true;
      // @ts-ignore
      corsOptions.allowedHeaders = ['Content-Type', 'Authorization', 'Origin'];
      // @ts-ignore
      corsOptions.origin = origin;
    }
    callback(null, corsOptions);
  }
}
