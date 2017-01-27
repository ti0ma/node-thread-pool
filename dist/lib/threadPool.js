"use strict";
class ThreadPool {
    constructor(script, options) {
        this.script = script;
        this.options = options;
    }
}
exports.ThreadPool = ThreadPool;
// for(let i = 0; i < this.options.numThreads; i++) {
//     console.log('Starting worker', i);
//     const child = ChildProcess.spawn(this.options.basePath, [this.script], {
//       detached: true
//     });
//     child.stdout.on('data', (data) => {
//       console.log(data.toString());
//     });
//     child.stdin.write(process.pid + '');
//     child.stderr.on('data', (data) => {
//       console.log(`ERROR: ${data}`);
//     });
//     child.unref();
//   }
