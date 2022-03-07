const { read, test: testRead } = require('./readNfc');
const { write, test: testWrite } = require('./writeNfc');
const { poll } = require('./pollNfc');
const { getTemp } = require('./hardware');

exports.read = read;
exports.write = write;
exports.poll = poll;
exports.getTemp = getTemp;

// Lazy Unit Tests
exports.test = function () {
    testRead();
    testWrite();
};
