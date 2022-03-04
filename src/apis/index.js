const { read, test: testRead } = require('./readNfc');
const { write, test: testWrite } = require('./writeNfc');

exports.read = read;
exports.write = write;

// Lazy Unit Tests
exports.test = function () {
    testRead();
    testWrite();
};
