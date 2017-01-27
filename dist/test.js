"use strict";
const index_1 = require("./index");
new index_1.ThreadPool('../worker.js', {
    basePath: process.execPath,
    numThreads: 2
});
(function wait() {
    if (true)
        setTimeout(wait, 1000);
})();
