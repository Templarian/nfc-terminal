const { readFileSync } = require('fs');
const { execSync } = require('child_process');

/**
 * NDef Records -> String[]
 */
function fromData(buffer) {
    const records = [];
    let index = 0,
        length = 0;
    do {
        switch(buffer.at(index)) {
            case '\x95':
            case '\x15':
            case '\x55':
            case '\xd5':
                // Short Record = 1
                index++; // 00
                index++; // Length 0 to 255
                length = buffer.charCodeAt(index);
                index++;
                records.push(buffer.substr(index, length));
                index += length;
                break;
            case '\x85':
            case '\x05':
            case '\x45':
            case '\xc5':
                // Short Record = 0
                index++; // 00
                index++; // 00
                index++; // Length 0 to 255
                var v = buffer.charCodeAt(index);
                index++; // Length 0 to 255
                length = buffer.charCodeAt(index) + (v * 256);
                index++;
                records.push(buffer.substr(index, length));
                index += length;
                break;
            default:
                // Really only support binary
                throw 'NDEF Unknown x05 only!';
        }
    } while (index !== buffer.length);
    return records;
}

exports.read = function () {
    return new Promise((resolve, reject) => {
        try {
            // Write NFC data to "read" file
            const stdout = execSync('mifare-desfire-read-ndef -o read -y');
            // Read File
            const data = readFileSync('read', { encoding: 'binary' });
            resolve(fromData(data));
        } catch ({ stderr }) {
            const message = stderr.toString().replace(/\r/g, '');
            if (message.match(/mifare-desfire-read-ndef/)) {
                // Follow docs/computer.md for instructions
                return resolve({
                    error: 'Install libnfc + libfreefare'
                });
            }
            resolve({
                error: message
            });
        }
    });
};

exports.test = function () {
    const data = readFileSync('src/assets/mock/write', { encoding: 'binary' });
    const records = fromData(data);
    if (records.length !== 5) {
        throw new Error(JSON.stringify(records));
    }
}
