const {
    readdirSync,
    readFileSync
} = require('fs');

const root = `${__dirname}/../../docs/examples`;

/**
 * parse args
 */
exports.args = function () {
    const defaults = {
        mode: 'prod'
    };
    const args = {};
    process.argv.splice(2).forEach((arg) => {
        const parts = arg.match(/--([^=]+)=(.*)/);
        args[parts[1]] = parts[2];
    });
    return { ...defaults, ...args };
};

/**
 * Get list of examples.
 * docs/examples/*.js
 */
exports.getDevExamples = function () {
    const files = readdirSync(root);
    return files
        .filter((file) => {
            return file.match(/\.js$/) !== null;
        })
        .map((file) => {
            return {
                name: file.replace('.js', '')
            }
        });
};

/**
 * Get example program
 */
exports.getDevExampleByName = function (file) {
    const data = readFileSync(`${root}/${file}.js`);
    const normalized = data.toString().replace(/\r/g, '');
    return [
        'javascript',
        '1',
        '2021-05-09T19:31:31Z',
        '2021-05-09T19:31:31Z',
        normalized
    ];
};
