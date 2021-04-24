const pn532 = require('pn532');
const SerialPort = require('serialport');
const ndef = require('ndef');

const { connection, baudRate } = require('./../config');

exports.write = function (value) {
  return new Promise((resolve, reject) => {
    var serialPort = new SerialPort(connection, { baudRate });
    var rfid = new pn532.PN532(serialPort);
    rfid.on('ready', function () {
      rfid.scanTag().then(function (tag) {
        var messages = [
          ndef.textRecord(value)
        ];
        var data = ndef.encodeMessage(messages);

        rfid.writeNdefData(data).then(function (response) {
          resolve({
            found: true,
            response
          });
        });
      });
    });
  });
};
