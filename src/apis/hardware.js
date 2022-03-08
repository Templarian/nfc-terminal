const { execSync } = require('child_process');
const gpiop = require('rpi-gpio').promise;

exports.getTemp = function () {
    const stdout = execSync('vcgencmd measure_temp');
    const temp = stdout.toString().replace(/[^0-9\.]+/g, '');
    return temp;
};

function on(pin) {
    gpiop.setup(pin, gpiop.DIR_OUT)
        .then(() => {
            return gpiop.write(pin, true);
        })
        .catch((err) => {
            console.log('Error: ', err.toString())
        });
}

function off(pin) {
    gpiop.setup(pin, gpiop.DIR_OUT)
        .then(() => {
            return gpiop.write(pin, false);
        })
        .catch((err) => {
            console.log('Error: ', err.toString())
        });
}

exports.blink = function (pin) {
    on(pin);
    setTimeout(() => {
        off(pin);
    }, 2000)
};

exports.on = on;
exports.off = off;
