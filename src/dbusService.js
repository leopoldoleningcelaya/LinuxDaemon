const DBus = require('dbus');
const { dbusServiceName, dbusObjectName, dbusInterfaceName } = require('../config/default');

let service = DBus.registerService('session', dbusServiceName);
let obj = service.createObject(dbusObjectName);

// Create interface

let interface = obj.createInterface(dbusInterfaceName);

interface.addMethod('Test', { out: DBus.Define(String) }, function(callback) {
	callback(null, 'Hello world!');
});

// Signal
let count = 0;
interface.addSignal('pump', {
	types: [
		DBus.Define(Number)
	]
});

interface.update();

// Emit signal per one second
setInterval(function() {
	count++;
	interface.emit('pump', count);
}, 1000);
