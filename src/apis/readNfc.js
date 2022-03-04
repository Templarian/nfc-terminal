const { readFileSync } = require('fs');
const { execSync } = require('child_process');

exports.read = function () {
    return new Promise((resolve, reject) => {
        try {
            const stdout = execSync('mifare-desfire-write-ndef -i write -y');
            resolve(stdout.toString());
            // Read File
            // readFileSync('write', { encoding: 'binary' });
        } catch ({ stderr }) {
            resolve({
                error: stderr.toString().replace(/\r/g, '')
            });
        }
    });
};
