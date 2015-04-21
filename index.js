var HID = require('node-hid'),
    http = require('request');

var STOP_BYTE = 40,
    API_SET_RFID = 'http://rfid-fitting-room-server.herokuapp.com/rfid';

var deviceId = 'USB_4242_e131_14100000',
    cardId = '';

function productScanned(uid) {
    http.post(API_SET_RFID).form({ id: uid });
    console.log('UID:', uid);
    cardId = '';
}

function reader(data) {
    var dataNibble = data[1];

    if ( dataNibble === STOP_BYTE ) {
        productScanned(cardId);
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