import * as dotenv from 'dotenv';
dotenv.config();
// import { URL } from 'node:url';
// import * as fs from 'node:fs';
// import * as path from 'node:path';
import * as http from 'node:http';
// import * as https from 'node:https';
// import browserSync from 'browser-sync';
import { generateClientRequest } from './utils.js';

// const __dirname = new URL('.', import.meta.url).pathname;

const [sourceFolder] = process.argv.slice(2);
let modulePath = '..';
if (sourceFolder) {
  modulePath += `/${sourceFolder}`;
}
const worker = await import(`${modulePath}/main.js`);

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

http.createServer(app).listen(3000, () => {
  console.log(`HTTP server running at http://localhost:${3000}/`);
  // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
  // browserSync({
  //   proxy: 'localhost:' + 3000,
  //   port: 8080,
  //   watch: true,
  //   files: [`${process.cwd()}/**/*.js`],
  //   ui: false,
  //   open: false,
  // });
});
// https
//   .createServer(
//     {
//       key: fs.readFileSync(path.join(__dirname, './local.key')),
//       cert: fs.readFileSync(path.join(__dirname, './local.cert')),
//     },
//     app
//   )
//   .listen(3443, () => {
//     console.log(`HTTPS server running at https://localhost:${3443}/`);
//   });
