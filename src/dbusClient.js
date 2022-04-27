const dbus = require('/usr/local/lib/node_modules/dbus');
const express = require('/usr/local/lib/node_modules/express');

const dbusObjectName = '/swlibre/dbus/service';
const dbusServiceName = 'swlibre.dbus.service';
const dbusInterfaceName = 'swlibre.dbus.service.Interface';

const bus = dbus.getBus('session');

let record = [];

process.umask(0000)
const fs = require('fs');
const pidFilePath = '/var/run/swlibreclient.pid'
if (fs.existsSync(pidFilePath)){
    process.exit(1)
}
else{
    fs.writeFileSync(pidFilePath, process.pid)
}

bus.getInterface(dbusServiceName, dbusObjectName, dbusInterfaceName,
    (_, iface) => iface.on('pump', count => record = [...record, `Count: ${count}`] )
);

const port = 3000;
const app = express();

app.get('/', (req, res) => {;
    res.send(record);
});

app.listen(port, () => {
    console.log(`PID: ${process.pid} Started: ${new Date()} Server listening on port ${port} <br/> \n`);
}) ;

process.on('SIGTERM', function () {
    if (app === undefined) return
    app.close();
    fs.rmSync(pidFilePath)
});