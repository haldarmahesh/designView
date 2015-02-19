module.exports = function(grunt)
{
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: [
							'app/js/*.js'
							],
				dest: 'dist/production.js'
			}
		},
		uglify: {
			build: {
				src: 'dist/production.js',
				dest: 'dist/production.min.js'
			}

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
			html1: {
			src: ['app/rectangle.html']
			}
		},
		jshint: {

			all: ['Gruntfile.js', 'app/js/**/*.js']
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
					'app/rectangle.html': 'dist/rectangle.html'
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
			},
			build: {
				files: {
					'dist/production.css': ['app/css/*.css']
				}
			}
			
		},
		jslint: {
			options: {
				edition: 'latest',
				junit: 'dest/server-junit.xml'
				//errorsOnly: true,
				//failOnError: false
			},
			server: {
				src: ['app/js/*.js']
			}
		},







	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	

	grunt.registerTask('default', ['concat', 'imagemin', 'htmlhint','jshint', 'jslint', 'uglify', 'csslint', 'cssmin', 'htmlmin']);
	grunt
};