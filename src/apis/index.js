const { firmware } = require('./firmwareNfc');
const { read } = require('./readNfc');
const { write, test: testWrite } = require('./writeNfc');

exports.firmware = firmware;
exports.read = read;
exports.write = write;

// Lazy Unit Tests
exports.test = function () {
    testWrite();
};
