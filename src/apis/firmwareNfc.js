const pn532 = require('pn532');
const SerialPort = require('serialport');

const { connection, baudRate } = require('./../config');

exports.firmware = function () {
    return new Promise((resolve, reject) => {
        var serialPort = new SerialPort(connection, { baudRate });
        var rfid = new pn532.PN532(serialPort);
        rfid.on('ready', function() {
            rfid.getFirmwareVersion().then(function(data) {
                console.log('firmware: ', data);
                resolve(data);
            });
        });
    });
};