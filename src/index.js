const daemonize = require('./daemonize');

function start() {
    let childService = daemonize('./src/dbusService.js');
    let childClient = daemonize('./src/dbusClient.js');

    console.log(`Service child process started with PID: ${childService.pid}`);
    console.log(`Client child process started with PID: ${childClient.pid}`);
    return process.exit();
}

start();
