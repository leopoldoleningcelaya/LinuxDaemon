const DBus = require('dbus');
const { dbusServiceName, dbusObjectName, dbusInterfaceName } = require('../config/default');
const fs = require('fs');


const port = 3000;
const bus = DBus.getBus('session');

bus.getInterface(dbusServiceName, dbusObjectName, dbusInterfaceName, function(err, iface) {
    
    iface.on('pump', function(count) {
        console.log(`Count: ${count} <br/>`);
	});
});


const app = require('express')();

app.get('/', (req, res) => {;
    res.send(fs.readFileSync('./src/log').toString());
});

app.listen(port, () => {
    console.log(`Server listening on port ${port} <br/>`)
});

process.on('SIGTERM', function () {
    if (server === undefined) return;
    server.close();
});
