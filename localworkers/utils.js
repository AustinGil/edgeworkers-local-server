import { faker } from '@faker-js/faker';

const notImplemented = () => {
  throw new Error('This function has not yet been implemented');
};

/**
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} [response]
 */
export const generateClientRequest = (request, response) => {
  /** @type {EW.IngressClientRequest} */
  const clientRequest = {
    addHeader: notImplemented,
    cacheKey: {
      excludeQueryString: notImplemented,
      includeCookie: notImplemented,
      includeHeader: notImplemented,
      includeQueryArgument: notImplemented,
      includeQueryString: notImplemented,
      includeVariable: notImplemented,
    },
    cpCode: faker.datatype.number(),
    device: {
      acceptsThirdPartyCookie: faker.datatype.boolean(),
      brandName: faker.random.word(),
      hasAjaxSupport: faker.datatype.boolean(),
      hasFlashSupport: faker.datatype.boolean(),
      hasCookieSupport: faker.datatype.boolean(),
      isMobile: faker.datatype.boolean(),
      isTablet: faker.datatype.boolean(),
      isWireless: faker.datatype.boolean(),
      marketingName: faker.random.word(),
      mobileBrowser: faker.random.word(),
      mobileBrowserVersion: faker.datatype.number().toString(),
      os: faker.helpers.randomize([
        'Android',
        'iOS',
        'Windows Phone',
        'Windows',
        'Mac OS X',
        'Linux',
      ]),
      osVersion: faker.datatype.number().toString(),
      modelName: faker.random.word(),
      physicalScreenHeight: faker.datatype.number(),
      physicalScreenWidth: faker.datatype.number(),
      resolutionHeight: faker.datatype.number(),
      resolutionWidth: faker.datatype.number(),
      xhtmlSupportLevel: faker.datatype.number(),
    },
    getHeader: (headerKey) => {
      const header = request.getHeader(headerKey).toString();
      return Array.isArray(header) ? header : [header];
    },
    getVariable: (name) => process.env[name],
    setHeader: notImplemented,
    host: request.headers.host,
    method: request.method,
    path: request.url.split('?')[0],
    query: request.url.split('?')[1],
    removeHeader: notImplemented, // response.removeHeader,
    respondWith: (status, headers, body, denyReason) => {
      if (body.length > 2048) {
        throw new Error('response.respondWith cannot exceed 2048 characters');
      }
      response.statusCode = status;
      response.write(body);
    },
    route: notImplemented,
    scheme: request.socket.encrypted ? 'https' : 'http',
    setVariable: notImplemented,
    url: request.url,
    userLocation: {
      city: faker.address.city(),
      continent: undefined,
      country: faker.address.countryCode(),
      region: faker.address.state(),
      zipCode: faker.address.zipCode(),
    },
  };
  return clientRequest;
};
