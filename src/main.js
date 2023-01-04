import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';

/**
 * @param request
 */
export async function responseProvider() {
  const results = await httpRequest(
    'https://jsonplaceholder.typicode.com/posts'
  ).then((r) => r.json());

  return createResponse(results);
}
