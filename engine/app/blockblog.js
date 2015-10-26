var path = require('path');
var fs = require('fs');
var Tracker = require('./tracker.js');




function BlockBlog() {
    this.rules = {};
}

BlockBlog.SPLITER = /^([^:]+)(:(.*))?$/;

BlockBlog.prototype = {
    addRule: function (type, fn) {
        this.rules[type] = fn;
    },
    loadRule: function (path) {
        var loader = require(path);
        return loader(this);
    },
    run: function (name, block) {
        var tokens = name.match(BlockBlog.SPLITER),
            type = tokens[1],
            param = tokens[3];

        return this.rules[type] && this.rules[type](block, param);
    },
    convert : function (src, dest, callback) {
        var blockblog = this;

        return fs.readFile(path.normalize(src), function (err, data) {
            if (err) throw err;

            var converted = blockblog.toHtml(data);

            return fs.writeFile(path.normalize(dest), converted, function (err) {
                if (err) throw err;

                return callback();
            });
        });
    },
    toHtml: function(doc) {
        var blockblog = this,
            lines = doc.toString().split('\r\n'),
            result = [],
            tracker = new Tracker(function (type, block) {
                console.log(type);
                result.push(blockblog.run(type, block));
            }),
            i;

        for (i=0; i<lines.length; ++i) {
            tracker.append(lines[i]);
        }

        tracker.flush();

        return result.join('\r\n');
    }
};

module.exports = BlockBlog;