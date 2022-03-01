const { writeFileSync } = require('fs');
const { execSync } = require('child_process');

const { connection, baudRate } = require('./../config');
const { stringify } = require('querystring');

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
    // Length
    const total = record.length;
    const overflow = Math.floor(total / 256);
    const length = total % 256;
    buffer.push(overflow);
    buffer.push(length);
    // Write Record
    for (let i = 0; i < total; i++) {
      buffer.push(record.charCodeAt(i))
    }
  });
  return buffer.map(code => {
    return String.fromCharCode(code);
  }).join('');
}

exports.write = function (records) {
  return new Promise((resolve, reject) => {
    // create file
    writeFileSync('write', toData(records), { encoding: 'binary' });
    try {
      const stdout = execSync('mifare-desfire-write-ndef -i write -y');
      resolve(stdout.toString());
    } catch ({ stderr }) {
      resolve({
        error: stderr.toString().replace(/\r/g, '')
      });
    }
  });
};
