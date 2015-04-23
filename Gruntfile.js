module.exports = function(grunt) {
	grunt.initConfig({
		browserify: {
			js: {
				src: 'app/js/app.js',
				dest: 'dist/js/app.js',
				options: {
					external: ['angular'],
					debug: true,
					browserifyOptions: { debug: true }
				}
			}},
			copy: {
				all: {
					expand: true,
					cwd: 'app/',
					src: ['**/*.html', '**/*.css', 'assets/**'],
					dest: 'dist/',
				}
			},
			watch: {
				js: {
					files: "app/**/*.js",
					tasks: "browserify"
				},
				html: {
					files: 'app/**/*.html',
					tasks: 'copy'
				},
				css: {
					files: 'app/**/*.css',
					tasks: 'copy'
				}
			}
		});

 // Load the npm installed tasks
 grunt.loadNpmTasks('grunt-browserify');
 grunt.loadNpmTasks('grunt-contrib-copy');
 grunt.loadNpmTasks('grunt-contrib-watch');

 // The default tasks to run when you type: grunt
 grunt.registerTask('default', ['browserify', 'copy']);
};