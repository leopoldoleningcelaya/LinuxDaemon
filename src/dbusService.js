const dbus = require('dbus');

const dbusObjectName = '/swlibre/dbus/service';
const dbusServiceName = 'swlibre.dbus.service';
const dbusInterfaceName = 'swlibre.dbus.service.Interface';

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
