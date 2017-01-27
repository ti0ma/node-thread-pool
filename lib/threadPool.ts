import * as ChildProcess from 'child_process';

interface ThreadPoolOptions {
  basePath: string;
  numThreads: number;
}

export class ThreadPool {
  workers: NodeJS.Process[];

  constructor(private script: string, private options: ThreadPoolOptions) {

  }
}

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
