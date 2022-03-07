const { execSync } = require('child_process');

exports.getTemp = function () {
    const stdout = execSync('vcgencmd measure_temp');
    return parseInt(stdout, 10);
};