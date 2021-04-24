var pn532 = require('pn532');
var SerialPort = require('serialport');
var ndef = require('ndef');

const { connection, baudRate } = require('./../config');

var i = 0;

exports.read = function () {
    return new Promise((resolve, reject) => {
        var serialPort = new SerialPort(connection, { baudRate });
        var rfid = new pn532.PN532(serialPort);
        rfid.on('ready', function () {
            // rfid.on('tag', function (tag) {
            rfid.scanTag().then(function(tag) {
                rfid.readNdefData().then(function (data) {
                    var records = ndef.decodeMessage(Array.from(data));
                    resolve({
                        found: true,
                        count: i++,
                        records
                    });
                });
            });
        });
        setTimeout(() => {
            resolve({
                found: false,
                count: i++,
                records: []
            });
        }, 5);
    });
};
