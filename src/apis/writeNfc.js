const { writeFileSync } = require('fs');
const { execSync } = require('child_process');

// ndef Unknown
const UNKNOWN = '101';
const tnf = UNKNOWN;
// id length (not used)
const IL = '0';

function getHeader(i, count, length) {
    // Begin
    const MB = i === 0 ? '1' : '0';
    // End
    const ME = count === i + 1 ? '1' : '0';
    // Fragment
    const CF = '0';
    // Length
    const overflow = Math.floor(length / 256);
    // Short Record
    const SR = overflow === 0 ? '1' : '0';
    // Combined
    return parseInt(`${MB}${ME}${CF}${SR}${IL}${tnf}`, 2);
}

/**
 * String[] -> NDef Records
 */
function toData(records) {
    const buffer = [];
    const count = records.length;
    records.forEach((record, i) => {
        // Length
        const total = record.length;
        const overflow = Math.floor(total / 256);
        const length = total % 256;
        // Short Record
        const SR = overflow === 0 ? '1' : '0';
        // Message Prefix
        const prefix = getHeader(i, count, total);
        buffer.push(prefix);
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
        // Write NFC data to "write" file
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

exports.test = function () {
    // Short Record = 1
    if (getHeader(0, 5, 14) !== 149) { // 95
        throw new Error('Invalid begin record (SR = 1)');
    }
    if (getHeader(1, 5, 14) !== 21) { // 15
        throw new Error('Invalid middle record (SR = 1)');
    }
    if (getHeader(4, 5, 14) !== 85) { // 55
        throw new Error('Invalid end record (SR = 1)');
    }
    if (getHeader(0, 1, 14) !== 213) { // D5
        throw new Error('Invalid single record (SR = 1)');
    }
    // Short Record = 0
    if (getHeader(0, 5, 256) !== 133) { // 85
        throw new Error('Invalid begin record (SR = 0)');
    }
    if (getHeader(1, 5, 256) !== 5) { // 5
        throw new Error('Invalid middle record (SR = 0)');
    }
    if (getHeader(4, 5, 256) !== 69) { // 45
        throw new Error('Invalid end record (SR = 0)');
    }
    if (getHeader(0, 1, 256) !== 197) { // C5
        throw new Error('Invalid single record (SR = 0)');
    }
}
