module.exports = function (grunt) {
    grunt.task.registerTask('sun', 'testing by sun', function (arg) {
        grunt.log.writeln('hello');
        grunt.log.writeln(arg);
    });
};