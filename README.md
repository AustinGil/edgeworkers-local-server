POC for running a local Node.js server that imitates Akamai EdgeWorkers. Lives local to this project, but behaves like an NPM packages that can be installed and run as a CLI tool within your project (see `package.json`).

Currently support
* Watching for changes and restarting.
* Most EdgeWorker `request` object properties and methods: `device` and `userLocation` are randomly generated on each request.
* EdgeWorker Built-ins: `create-response`, `http-request`, `url-search-params`.
* `request.getVariable`: Pulls variables from `process.env`. You can also add a .env file to your project root and the variables will be injected at runtime.

To use, copy the `localworkers` folder into your project then `npm install ./localworkers`.
