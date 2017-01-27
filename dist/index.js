"use strict";
require('app-module-path').addPath(__dirname);
const threadPool_1 = require("lib/threadPool");
const thread_1 = require("lib/thread");
// TypeScript doesn't know how to export the default =(
threadPool_1.ThreadPool['ThreadPool'] = threadPool_1.ThreadPool;
threadPool_1.ThreadPool['Thread'] = thread_1.Thread;
module.exports = threadPool_1.ThreadPool;
