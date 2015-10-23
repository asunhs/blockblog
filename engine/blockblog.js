
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
    }
};

var blockblog = new BlockBlog(),
    path = require('path'),
    fs = require('fs'),
    rules = fs.readdir('./engine/rules', function (err, files) {
        if (err) throw err;

        files.forEach(function (file) {
            blockblog.loadRule('./rules/' + file);
        });
    });

module.exports = function (grunt) {

    var stack = [];

    function toHtml(doc) {
        var lines = doc.toString().split('\r\n');

        return lines.map(function (line) {
            return blockblog.run('Default', line);
        }).join('\r\n');
    }



    function convert(src, dest, callback) {
        grunt.log.writeln(src);
        grunt.log.writeln(dest);

        return fs.readFile(path.normalize(src), function (err, data) {
            if (err) throw err;

            var converted = toHtml(data);

            return fs.writeFile(path.normalize(dest), converted, function (err) {
                if (err) throw err;

                return callback();
            });
        });
    }

    function getHtmlFilename(name) {
        var index = name.lastIndexOf('.');

        if (index < 0) {
            return name + '.html';
        }
        return name.substring(0, index) + '.html';
    }

    function unixifyPath(filepath) {
        if (process.platform === 'win32') {
            return filepath.replace(/\\/g, '/');
        } else {
            return filepath;
        }
    }

    grunt.registerMultiTask('blockblog', 'Convert to Block-blog', function () {

        grunt.log.writeln('hello');

        var cnt = 0,
            total = 0,
            done = this.async();

        this.files.forEach(function (pair) {
            pair.src.forEach(function (src) {
                total++;
                convert(pair.src, unixifyPath(path.join(pair.dest, getHtmlFilename(src))), function () {
                    if (total == ++cnt) {
                        done();
                    }
                });
            });
        });
    });
};