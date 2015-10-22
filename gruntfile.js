module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-env');

    grunt.loadTasks('./engine');

    // Default tasks.
    //grunt.registerTask('default', ['excel_vocabulary', 'eslint', 'concat', 'browserify', 'html2js', 'cssmin', 'copy', 'replace']);
    grunt.registerTask('default', ['sun']);

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        baseDir: 'src',
        distDir: 'dist',
        src: {
            //js: ['<%=baseDir%>/app/**/*.js'],
            //react: ['<%=baseDir%>/app/**/*.jsx']
        },
        clean: ['<%= distDir %>/<%= pkg.name %>.js', '<%= distDir %>/<%= pkg.name %>.templates.js', '<%= distDir %>/<%= pkg.name %>.min.css', '<%= distDir %>/<%= pkg.name %>2.min.css', '<%= distDir %>/<%= pkg.name %>-react.js', '<%= distDir %>/<%= pkg.name %>-gw.templates.js'],
        concat : {
            //javascripts: {
            //    src: [
            //        '<%=baseDir%>/lib/javascripts/**/*.js'
            //    ],
            //    dest: '<%=distDir%>/lib/javascripts/javascripts.custom.js'
            //}
        },
        sun: ['hi'],
        copy: {
            //lib: {
            //    files: [
            //        {
            //            dest: '<%=distDir%>/lib',
            //            src: ['underscore/**/*', 'ui/**/*', 'ckeditor/**/*', 'closure-library/*', 'cryptojs/*', 'react/*', 'jqwidget/**/*', 'webpush/*'],
            //            cwd: '<%=baseDir%>/lib',
            //            expand: true
            //        }
            //    ]
            //}
        },
        watch:{
            //index: {
            //    files: ['<%=baseDir%>/index.html', '<%=baseDir%>/bookmarklet.html', '<%=baseDir%>/helpCenter.html', '<%=baseDir%>/app_download.html', '<%=baseDir%>/tutorial.html'],
            //    tasks: ['copy:index']
            //},
            configFiles: {
                files: ['gruntfile.js'],
                options: {
                    reload: true
                }
            }
        }
    });
};