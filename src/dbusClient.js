const dbus = require('dbus');
const express = require('express');

const dbusObjectName = '/swlibre/dbus/service';
const dbusServiceName = 'swlibre.dbus.service';
const dbusInterfaceName = 'swlibre.dbus.service.Interface';

const bus = dbus.getBus('session');

let record = [];

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
    if (server === undefined) return
    server.close();
});