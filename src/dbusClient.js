const { dbusObjectName, dbusServiceName, dbusInterfaceName } = require("../config/default.js");
const fs = require('fs');
const dbus = require('dbus');
const express = require('express');
const pidFile = '/var/run/swlibre/dbus_client.pid';

if(process.env.__daemon) {
	process.umask(0o077);
    process.chdir("/");
}



if (fs.existsSync(pidFile)){
    process.exit(1)
}
else{
    fs.writeFileSync(pidFile, process.pid.toString())
}

const bus = dbus.getBus('session');
let record = [];

bus.getInterface(dbusServiceName, dbusObjectName, dbusInterfaceName,
    (_, iface) =>  iface.on('pump', count => record = [...record, `Count: ${count}`] )
);

const port = 3000;
const app = express();

app.get('/', (req, res) => {;
    res.send(record);
});

app.listen(port, () => {
    console.log(`PID: ${process.pid} Started: ${new Date()} Server listening on port ${port} <br/> \n`);
}) ;

process.on('SIGTERM', () => {
    fs.rmSync(pidFile);
    process.exit(1);
});
