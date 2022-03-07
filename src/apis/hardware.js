const { execSync } = require('child_process');

exports.getTemp = function () {
    const stdout = execSync('vcgencmd measure_temp');
    console.log(stdout);
    return parseInt(stdout, 10);
};