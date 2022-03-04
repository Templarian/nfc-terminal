const { readFileSync } = require('fs');
const { execSync } = require('child_process');

/**
 * NDef Records -> String[]
 */
function fromData(arrayBuff) {

    return [];
}

exports.read = function () {
    return new Promise((resolve, reject) => {
        try {
            // Write NFC data to "read" file
            const stdout = execSync('mifare-desfire-read-ndef -o read -y');
            // Read File
            readFileSync('read', { encoding: 'binary' });
        } catch ({ stderr }) {
            const message = stderr.toString().replace(/\r/g, '');
            if (message.match(/mifare-desfire-read-ndef/)) {
                // Follow docs/computer.md for instructions
                return resolve({
                    error: 'Install libnfc + libfreefare'
                });
            }
            resolve({
                error: stderr.toString().replace(/\r/g, '')
            });
        }
    });
};

exports.test = function () {
    
}
