"use strict";
const ps = require("ps");
const net = require("net");
const baseConfig = {
    parentCheckInterval: 2000,
    socket: {
        ip: '127.0.0.1',
        port: 6544
    }
};
class Thread {
    constructor(ppid, config) {
        this.ppid = ppid;
        this.config = Object.assign({}, baseConfig, config);
        this.createSocket()
            .then(this.initPatentCheck);
    }
    createSocket() {
        this.socket = new net.Socket();
        return new Promise((resolve, reject) => {
            this.socket.connect(this.config.socket.port, this.config.socket.ip, resolve);
            this.socket.on('data', this.processMessage.bind(this));
            this.socket.on('error', reject);
        });
    }
    processMessage(data) {
        console.log(data);
    }
    initPatentCheck() {
        if (!this.parentCheckInterval) {
            this.parentCheckInterval = setInterval(() => {
                ps.lookup({
                    pid: this.ppid
                }, (err, data) => {
                    if (err || !data) {
                        console.log('Parent is dead. Killing myself.');
                        clearInterval(this.parentCheckInterval);
                        process.exit(1);
                    }
                });
            }, this.config.parentCheckInterval);
        }
    }
}
exports.Thread = Thread;
