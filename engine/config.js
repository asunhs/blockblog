var BlockBlog = require('./app/blockblog.js');
var blockblog = new BlockBlog();
var path = require('path');
var fs = require('fs');

fs.readdir('./engine/rules', function (err, files) {
    if (err) throw err;

    files.forEach(function (file) {
        blockblog.loadRule('../rules/' + file);
    });
});

module.exports = function (grunt) {

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
                blockblog.convert(pair.src, unixifyPath(path.join(pair.dest, getHtmlFilename(src))), function () {
                    if (total == ++cnt) {
                        done();
                    }
                });
            });
        });
    });
};