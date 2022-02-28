const pn532 = require('pn532');
const SerialPort = require('serialport');
const ndef = require('ndef');
const { writeFileSync } = require('fs');
const { execSync } = require('child_process');

const { connection, baudRate } = require('./../config');

// ndef Unknown
const unknown = 5;

function hex(d) {
    return parseInt(d, 16);
}

// 1 record C5
// 2 record 95 55
// 3 record 95 15 55

function toData(records) {
    const buffer = [];
    const count = records.length;
    records.forEach((record, i) => {
        if (count === 1) {
            buffer.push(hex(`c${unknown}`));
        } else if (i === 0) {
            buffer.push(hex(`9${unknown}`));
        } else if (count === i + 1) {
            buffer.push(hex(`5${unknown}`));
        } else {
            buffer.push(hex(`1${unknown}`));
        }
        // Spacer
        buffer.push(0);
        // Length
        const total = record.length;
        const overflow = Math.floor(total / 256);
        const length = total % 256;
        if (overflow === 0) {
            buffer.push(length);
        } else {
            buffer.push(overflow);
            buffer.push(length);
        }
        // Write Record
        for (let i = 0; i < total; i++) {
            buffer.push(record.charCodeAt(i))
        }
    });
    return buffer.map(code => String.fromCharCode(code)).join('');
}

exports.write = function (records) {
  return new Promise((resolve, reject) => {
    // create file
    const buffer = Buffer.from(toData(records));
    writeFileSync('write', buffer);
    const stdout = execSync('mifare-desfire-write-ndef -i write -y');
    
    resolve(stdout);
    /*var serialPort = new SerialPort(connection, { baudRate });
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
    });*/
  });
};
