const child_process = require('child_process');

function start() {
    if (process.env.__daemon) {
        return process.pid;
    }

    let stdin = null;
    let stdout = null;
    let stderr = 2;
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

