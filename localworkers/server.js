import * as dotenv from 'dotenv';
dotenv.config();
import * as fs from 'node:fs';
import * as http from 'node:http';
import * as https from 'node:https';
import { generateClientRequest } from './utils.js';

const [sourceFolder] = process.argv.slice(2);
let modulePath = '..';
if (sourceFolder) {
  modulePath += `/${sourceFolder}`;
}
const worker = await import(`${modulePath}/main.js`);

// import livereload from 'livereload';

/** @type {import('node:http').RequestListener} */
const app = async (request, response) => {
  // console.log(request.)
  const clientRequest = generateClientRequest(request, response);
  if (worker.onClientRequest) {
    const maybePromise = worker.onClientRequest(clientRequest);
    if (typeof maybePromise.then === 'function') {
      await maybePromise;
    }
  }
  if (worker.responseProvider) {
    const maybePromise = worker.responseProvider(clientRequest);
    if (typeof maybePromise.then === 'function') {
      await maybePromise;
    }
  }
  if (!response.writableEnded) response.end();
};

// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch('./src'); // 37529
// <script src="//localhost:37529/livereload.js?snipver=1" async defer></script>

http.createServer(app).listen(3000, () => {
  console.log(`HTTP server running at http://localhost:${3000}/`);
});
https
  .createServer(
    {
      key: fs.readFileSync('./local.key'),
      cert: fs.readFileSync('./local.cert'),
    },
    app
  )
  .listen(3443, () => {
    console.log(`HTTPS server running at https://localhost:${3443}/`);
  });
