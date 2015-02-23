module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/index.html']
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'app/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },
    htmlhint: {
      src: ['app/*.html']

    },
    jshint: {
      all: ['Gruntfile.js', 'app/js/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }

    },
    csslint: {
      src: ['app/css/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/production.min.html': 'app/*.html'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);


  grunt.registerTask('default', ['htmlhint', 'jshint', 'csslint']);
  grunt.registerTask('build', ['useminPrepare', 'conact:generated', 'uglify:generated', 'cssmin:generated', 'usemin', 'htmlmin']);
};