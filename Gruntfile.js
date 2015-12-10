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
    open: {
      dev: {
        path: './index.html',
        app: 'chromium-browser %U'
      }
    }
  });
  // Load the plugin that provides the task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-open');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'open']);
}
