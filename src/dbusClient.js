const DBus = require('dbus');
const { dbusServiceName, dbusObjectName, dbusInterfaceName } = require('../config/default');


//
const logPath = '/var/log/swlibrelog'
const fs = require('fs');
const logFileStream = fs.createWriteStream(logPath, {flags:'a'});


const port = 3000;
const bus = DBus.getBus('session');



bus.getInterface(dbusServiceName, dbusObjectName, dbusInterfaceName, function(err, iface) {
    
    iface.on('pump', function(count) {
        logFileStream.write(`Count: ${count} <br/> \n`);
	});
});


const app = require('express')();

app.get('/', (req, res) => {;
    res.send(fs.readFileSync(logPath).toString());
});

app.listen(port, () => {
    logFileStream.write(`PID: ${process.pid} Started: ${new Date()} Server listening on port ${port} <br/> \n`)
}) ;

process.on('SIGTERM', function () {
    if (server === undefined) return
    server.close();
});