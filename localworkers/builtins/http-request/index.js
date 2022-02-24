import fetch from 'node-fetch';
/**
 * @param {string} url
 * @param {{
 * method?: string,
 * headers?: Headers | Record<string, string>,
 * body?: string,
 * timeout?: number,
 * }} [options={}]
 */
export const httpRequest = (url, options = {}) => {
  const httpOptions = {
    method: options.method || 'GET',
    headers: options.headers || {},
  };
  return fetch(url, httpOptions).then((r) => r.json());
};
