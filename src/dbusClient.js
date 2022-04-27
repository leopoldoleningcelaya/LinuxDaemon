const DBus = require('dbus');
const { dbusServiceName, dbusObjectName, dbusInterfaceName } = require('../config/default');
const fs = require('fs');


const port = 3000;
const bus = DBus.getBus('session');

bus.getInterface(dbusServiceName, dbusObjectName, dbusInterfaceName, function(err, iface) {
    
    iface.on('pump', function(count) {
        process.stdout.write(`Count: ${count} <br/>`);
	});
});


const app = require('express')();

app.get('/', (req, res) => {;
    res.send(fs.readFileSync('/var/log/swlibrelog').toString());
});

app.listen(port, () => {
    process.stdout.write(`Server listening on port ${port} <br/>`)
}) ;

process.on('SIGTERM', function () {
    if (server === undefined) return;
    server.close();
});