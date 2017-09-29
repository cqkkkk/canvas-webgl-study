const path = require('path');
const mkTemplate = require('./plugin.makefile');
function makedir() {}

makedir.prototype.apply = compiler => {
    compiler.plugin('emit', (compilation, callback) => {
        let arr = [];
        compilation.chunks.forEach(chunk => {
            for (let filename of chunk.files) {
                arr.push(mkTemplate(filename, compilation));
            }
        });
        Promise.all(arr).then(() => {
            callback();
        });
    });
};
module.exports = makedir;
