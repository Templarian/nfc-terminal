const { execSync } = require('child_process');
const Gpio = require('pigpio').Gpio;

exports.getTemp = function () {
    const stdout = execSync('vcgencmd measure_temp');
    const temp = stdout.toString().replace(/[^0-9\.]+/g, '');
    return temp;
};

exports.pulseLed = function (pin) {
    const led = new Gpio(pin, { mode: Gpio.OUTPUT });

    let dutyCycle = 0;

    setInterval(() => {
        led.pwmWrite(dutyCycle);

        dutyCycle += 5;
        if (dutyCycle > 255) {
            dutyCycle = 0;
        }
    }, 20);
};

exports.setLed = function (pin, value) {
    if (isNaN(level)) {
        throw `LED level must be a number.`;
    }
    if (!(level >= 0 && level <= 255)) {
        throw `LED level must be between 0 and 255.`;
    }
    const led = new Gpio(pin, { mode: Gpio.OUTPUT });
    led.pwmWrite(value);
};
