

module.exports = function (blockblog) {
    blockblog.addRule('Default', function (block) {
        return '\t' + block;
    });
};
