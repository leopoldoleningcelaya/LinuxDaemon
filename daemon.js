const child_process = require('child_process');
const fs = require('fs')

function start() {
    if (process.env.__daemon) {
        return process.pid;
    }

    let stdin = fs.openSync('/dev/null', 'w');
    let stdout = stdin;
    let stderr = stdin;
    let env = process.env
    env.__daemon = true

    let options = {
        stdio: [stdin, stdout, stderr, 'ipc'],
        env: env,
        cwd: process.cwd(),
        detached: true
    };
    
    var child = child_process.fork(process.cwd(), [], options);
    
    child.unref();
    console.log(`Child process started with PID: ${child.pid}`);
    return process.exit();
}

start();

