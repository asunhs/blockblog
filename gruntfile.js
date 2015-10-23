module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-env');

    grunt.loadTasks('./engine');

    // Default tasks.
    //grunt.registerTask('default', ['excel_vocabulary', 'eslint', 'concat', 'browserify', 'html2js', 'cssmin', 'copy', 'replace']);
    grunt.registerTask('default', ['blockblog']);

    grunt.initConfig({
        baseDir: 'src',
        distDir: 'dist',
        src: {
            //js: ['<%=baseDir%>/app/**/*.js'],
            //react: ['<%=baseDir%>/app/**/*.jsx']
        },
        blockblog: {
            first: {
                src: ['<%=baseDir%>/**/*.bbd'],
                dest: '<%=distDir%>'
            }
        },
        watch:{
            configFiles: {
                files: ['gruntfile.js'],
                options: {
                    reload: true
                }
            }
        }
    });
};