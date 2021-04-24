const { firmware } = require('./firmwareNfc');
const { read } = require('./readNfc');
const { write } = require('./writeNfc');

exports.firmware = firmware;
exports.read = read;
exports.write = write;