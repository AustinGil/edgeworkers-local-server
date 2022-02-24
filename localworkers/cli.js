#!/usr/bin/env node

import { URL } from 'node:url';
import nodemon from 'nodemon';

const arguments_ = process.argv.slice(2);
const sourceFolder = arguments_[0] || '';
const __dirname = new URL('.', import.meta.url).pathname;

nodemon({
  script: __dirname + 'server.js',
  args: [sourceFolder],
  ext: 'js json',
  watch: [sourceFolder],
});

nodemon
  // .on('start', function () {
  //   console.log('App has started', arguments);
  // })
  .on('quit', function () {
    // console.log('App has quit', arguments);
    process.exit();
  })
  .on('restart', function (files) {
    console.log('App restarted due to change in', files);
  });
