var path = require('path');
var fs = require('fs');


function parse(result, line, blockblog) {
    result.push(blockblog.run('Default', line));



    return result;
}




function toHtml(doc, blockblog) {
    var lines = doc.toString().split('\r\n');

    return lines.reduce(function (result, line) {
        return parse(result, line, blockblog);
    }, []).join('\r\n');
}



function BlockBlog() {
    this.rules = {};
}

BlockBlog.prototype = {
    addRule: function (name, fn) {
        this.rules[name] = fn;
    },
    loadRule: function (path) {
        var loader = require(path);
        return loader(this);
    },
    run: function (name, block) {
        return this.rules[name] && this.rules[name](block);
    },
    convert : function (src, dest, callback) {

        var blockblog = this;

        return fs.readFile(path.normalize(src), function (err, data) {
            if (err) throw err;

            var converted = toHtml(data, blockblog);

            return fs.writeFile(path.normalize(dest), converted, function (err) {
                if (err) throw err;

                return callback();
            });
        });
    }
};

module.exports = BlockBlog;