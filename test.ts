import { ThreadPool } from './index';

new ThreadPool('../worker.js', {
  basePath: process.execPath,
  numThreads: 2
});

(function wait () {
   if (true) setTimeout(wait, 1000);
})();
