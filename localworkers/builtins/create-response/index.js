/**
 * @see https://techdocs.akamai.com/edgeworkers/docs/create-response
 */

/**
 * @typedef {import("create-response").CreateResponseBody} CreateResponseBody
 * @typedef {{
 * status?: number,
 * headers?: { [key: string]: string },
 * deny_reason?: string,
 * }} Options
 */

/**
 * @type {{
 * (status:number, headers:Headers, body:CreateResponseBody, deny_reason?:string): object;
 * (body?:CreateResponseBody, options?:Options): object;
 * }}
 */
export const createResponse = function (...parameters) {
  let status = parameters[0] || 200;
  let headers = parameters[1] || {};
  let body = parameters[2] || '';
  let deny_reason = parameters[3] || '';

  if (parameters.length < 3) {
    body = parameters[0] || '';
    /** @type {Options} */
    const options = parameters[1] || {};
    status = options.status || 200;
    headers = options.headers || {};
    deny_reason = options.deny_reason || '';
  }

  return {
    body: body,
    status: status,
    headers: headers,
    deny_reason: deny_reason,
  };
};
