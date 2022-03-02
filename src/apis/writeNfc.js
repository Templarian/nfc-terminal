const { writeFileSync } = require('fs');
const { execSync } = require('child_process');

// ndef Unknown
const UNKNOWN = '101';
const tnf = UNKNOWN;
// id length (not used)
const IL = '0';

// c5 95 55 15

function toData(records) {
  const buffer = [];
  const count = records.length;
  records.forEach((record, i) => {
    // Begin
    const MB = i === 0 ? '1' : '0';
    // End
    const ME = count === i + 1 ? '1' : '0';
    // Fragment
    const CF = count !== i + 1 ? '1' : '0';
    // Length
    const total = record.length;
    const overflow = Math.floor(total / 256);
    const length = total % 256;
    // Short Record
    const SR = overflow === 0 ? '1' : '0';
    // Combined
    const binary = parseInt(`${MB}${ME}${CF}${SR}${IL}${tnf}`, 2);
    buffer.push(binary);
    // Type Length (not used for binary data)
    buffer.push(0);
    if (SR === '1') {
      buffer.push(length);
    } else {
      buffer.push(0);
      buffer.push(0);
      // 256 * Overflow + Length
      buffer.push(overflow);
      buffer.push(length);
    }
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
