const { execSync } = require('child_process');

exports.getTemp = function () {
    const stdout = execSync('vcgencmd measure_temp');
    const temp = stdout.toString().replace(/[^0-9\.]+/g, '');
    return temp;
};