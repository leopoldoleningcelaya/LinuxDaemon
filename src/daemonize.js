const child_process = require('child_process');
const fs = require('fs');

module.exports = function daemonize(scriptFile, stdout_route) {

    const dev_null = fs.openSync('/dev/null');
    const stdout = fs.openSync((stdout_route || '/dev/null'), 'w');
    const env = process.env
    
    const opt = {
        stdio: [dev_null, stdout, dev_null, 'ipc'],
        env: env,
        cwd: process.cwd(),
        detached: true
    };

    const child = child_process.fork(scriptFile, [], opt);
    child.unref();

    return child;
}
