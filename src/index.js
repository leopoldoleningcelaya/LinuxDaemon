const child_process = require('child_process');
const fs = require('fs')

function start() {
    if (process.env.__daemon) {
        return process.pid;
    }

    let dev_null = fs.openSync('/dev/null', 'w');
    let env = process.env
    env.__daemon = true
    
    let serviceOpt = {
        stdio: [dev_null, dev_null, dev_null, 'ipc'],
        env: env,
        cwd: process.cwd(),
        detached: true
    };
    
    let client_stdout = fs.openSync('/var/log/swlibrelog', 'w');
    let clientOpt = {
        stdio: [dev_null, client_stdout, dev_null, 'ipc'],
        env: env,
        cwd: process.cwd(),
        detached: true
    };

    let childService = child_process.fork('./src/dbusService.js', [], serviceOpt);
    childService.unref();

    let childClient = child_process.fork('./src/dbusClient.js', [], clientOpt);
    childClient.unref();

    console.log(`Service child process started with PID: ${childService.pid}`);
    console.log(`Client child process started with PID: ${childClient.pid}`);
    return process.exit();
}

start();
