const { execSync } = require('child_process');

exports.poll = function () {
    return new Promise((resolve, reject) => {
        try {
            // Write NFC data to "read" file
            const stdout = execSync('nfc-poll');
            console.log(stdout);
            resolve(JSON.stringify(stdout));
        } catch ({ stderr }) {
            const message = stderr.toString().replace(/\r/g, '');
            resolve({
                error: message
            });
        }
    });
};