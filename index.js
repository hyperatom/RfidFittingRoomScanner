var HID = require('node-hid');

console.log(HID.devices());

try {
    var scannerId = 'USB_4242_e131_14100000',
        scanner = new HID.HID(scannerId);

    scanner.on('data', reader);
} catch (e) {
    console.log(e);
}

function reader(data) {
    console.log(data.toString());
}

//0268098208

/*

function reader(err, data) {

    var size, id;

    console.log("\n" + data.map(function (v) {return ('00' + v.toString(16)).slice(-2)}).join(','));

*/
/*    //get 64 bytes
    if (data[0] != 0) {

        console.log("\n" + data.map(function (v) {return ('00' + v.toString(16)).slice(-2)}).join(','));

        switch (data[0]) {
            case 1:
                //Orientation change
                switch (data[1]) {
                    case 4:
                        console.log("-> mir:ror up");
                        break;
                    case 5:
                        console.log("-> mir:ror down");
                        break;
                }
                break;
            case 2:
                //RFID
                switch (data[1]) {
                    case 1:
                        console.log("-> RFID in");
                        break;
                    case 2:
                        console.log("-> RFID out");
                        break;
                }

                size = data[4];
                id = (data.splice(0)).splice(5, size);
                console.log(id.map(function (v) {return ('00' + v.toString(16)).slice(-2)}).join(','));
                break;
        }
    }*//*


    scanner.read(reader);
}*/
