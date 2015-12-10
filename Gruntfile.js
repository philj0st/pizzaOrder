module.exports = function(grunt){
  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: '',
      },
      dist: {
        src: ['src/Controller.js', 'src/Pizza.js', 'src/Selection.js'],
        dest: 'dist/built.js',
      },
    },
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat']);
}
