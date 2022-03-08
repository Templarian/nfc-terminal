const { execSync } = require('child_process');
const gpiop = require('rpi-gpio').promise;
const Gpio = require('pigpio').Gpio;

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
    const led = new Gpio(pin, { mode: Gpio.OUTPUT });

    let dutyCycle = 0;

    setInterval(() => {
        led.pwmWrite(dutyCycle);

        dutyCycle += 5;
        if (dutyCycle > 255) {
            dutyCycle = 0;
        }
    }, 20);

    /*on(pin);
    setTimeout(() => {
        off(pin);
    }, 2000)*/
};

exports.setLed = function (value) {
    const led = new Gpio(17, { mode: Gpio.OUTPUT });
    led.pwmWrite(value);
};

exports.on = on;
exports.off = off;
