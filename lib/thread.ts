import * as ps from 'ps';
import * as net from 'net';

declare type IThreadConfig = {
  parentCheckInterval: number;
  socket: {
    ip: string,
    port: number
  }
};

const baseConfig: IThreadConfig = {
  parentCheckInterval: 2000,
  socket: {
    ip: '127.0.0.1',
    port: 6544
  }
};

export class Thread {
  private parentCheckInterval: NodeJS.Timer;
  private config: IThreadConfig;
  private socket: net.Socket;

  constructor(public ppid: number, config: IThreadConfig) {
    this.config = Object.assign({}, baseConfig, config);

    this.createSocket()
      .then(this.initPatentCheck);
  }

  private createSocket() {
    this.socket = new net.Socket();
    return new Promise((resolve, reject) => {
      this.socket.connect(this.config.socket.port, this.config.socket.ip, resolve);

      this.socket.on('data', this.processMessage.bind(this));

      this.socket.on('error', reject);
    });
  }

  private processMessage(data) {
    console.log(data);
  }

  private initPatentCheck() {
    if(!this.parentCheckInterval) {
      this.parentCheckInterval = setInterval(() => {
        ps.lookup({
          pid: this.ppid
        }, (err, data) => {
          if(err || !data) {
            console.log('Parent is dead. Killing myself.');
            clearInterval(this.parentCheckInterval);
            process.exit(1);
          }
        });
      }, this.config.parentCheckInterval);
    }
  }
}
