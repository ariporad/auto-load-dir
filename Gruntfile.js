module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //
    // Testing
    //

    // Lint the JS files
    jshint: {
      node: {
        src: '**/*.js',
        expand: true,
        cwd: 'src',
        options: {
          node: true // Some Node.js specific stuff
        }
      }
    },

    // Test the Nodecode™
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: './test.setup.js'
        },
        expand: true,
        src: '**/*.test.js',
        cwd: 'src'
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage.html'
        },
        expand: true,
        src: '**/*.test.js',
        cwd: 'src'
      }
    },

    // Watch for changes
    watch: {
      node: {
        files: {
          expand: true,
          cwd: 'src',
          src: '**/*.js'
        },
        options: {
          tasks: ['test']
        }
      }
    }
  });

  // load the plugins
  require('load-grunt-tasks')(grunt);

  //
  // Tasks
  //

  grunt.registerTask('test', 'Runs the tests', ['lint', 'mochaTest']);
  grunt.registerTask('lint', 'Lints the source code', ['jshint']);
};
