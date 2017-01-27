const ps = require('ps');

process.stdout.write('HOLA, SOY WORKER', process.pid);
let connEstablished = false;

process.stdin.on('data', function(data) {
  connEstablished = true;
  process.stdout.write(`PARENT: ${data}`);
  setInterval(() => {
    console.time('asdf');
    ps.lookup({
      pid: data
    }, (err, proc) => {
      console.timeEnd('asdf');
      if(err || !proc) {
        process.exit();
      }
    });
  }, 15000);
});

setTimeout(() => {
  if(!connEstablished) {
    process.exit(1);
  }
}, 10000);
