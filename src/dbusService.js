const { dbusObjectName, dbusServiceName, dbusInterfaceName } = require("../config/default.js");
const fs = require('fs');
const dbus = require('dbus');
const pidFile = '/var/run/swlibre/dbus_service.pid';


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


let service = dbus.registerService('session', dbusServiceName);
let obj = service.createObject(dbusObjectName);

// Create interface
let interface = obj.createInterface(dbusInterfaceName);

// Signal
let count = 0;
interface.addSignal('pump', {
	types: [
		dbus.Define(Number)
	]
});

interface.update();

// Emit signal per one second
setInterval(function() {
	count++;
	interface.emit('pump', count);
}, 1000);

process.on('SIGTERM', () => {
    fs.rmSync(pidFile);
    process.exit(1);
});