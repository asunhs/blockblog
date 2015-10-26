

module.exports = function (blockblog) {
    blockblog.addRule('Default', function (block) {
        return '\t' + block.join('\r\n');
    });

    blockblog.addRule('BigImage', function (block) {
        return '\t\t' + block.join('\r\n');
    });

    blockblog.addRule('Code', function (block, param) {

        return '\t\t\t' + block.join('\r\n') + '\r\n' + param;
    });
};
