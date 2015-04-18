var HID = require('node-hid');

var STOP_BYTE = 40;

var deviceId = 'USB_4242_e131_14100000',
    cardId = '';

function reader(data) {
    var dataNibble = data[1];

    if ( dataNibble === STOP_BYTE ) {
        console.log('Card ID:', cardId);
        cardId = '';
    } else if ( dataNibble !== 0 ) {
        cardId += (++dataNibble) % 10;
    }
}

try {
    var scanner = new HID.HID(deviceId);
    scanner.on('data', reader);
} catch (e) {
    console.log(e);
}