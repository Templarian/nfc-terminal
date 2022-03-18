const { read, test: testRead } = require('./readNfc');
const { write, test: testWrite } = require('./writeNfc');
const { poll } = require('./pollNfc');
const {
    getTemp,
    setLed
} = require('./hardware');
const {
    args,
    getDevExamples,
    getDevExampleByName
} = require('./dev');

exports.read = read;
exports.write = write;
exports.poll = poll;
exports.getTemp = getTemp;
exports.setLed = setLed;
exports.args = args;
exports.getDevExamples = getDevExamples;
exports.getDevExampleByName = getDevExampleByName;

// Lazy Unit Tests
exports.test = function () {
    testRead();
    testWrite();
};
