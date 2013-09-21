module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    /*
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [],
        dest: ''
      }
    },
    */
    concurrent: {
        target: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    },
    nodemon: {
      dev: {
        options: {
          file: 'init.js',
          args: ['development'],
          nodeArgs: ['--debug'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['server', 'frontend/scripts'],
          delayTime: 1,
          legacyWatch: true,
          env: {
            PORT: '3000'
          },
          cwd: __dirname
        }
      },
      exec: {
        options: {
          exec: 'less'
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["assets/styles"]
        },
        files: {
          "public/styles/bootstrap.css": "frontend/components/bootstrap/less/bootstrap.less"
        }
      },
      /*
      production: {
        options: {
          paths: ["assets/css"],
          yuicompress: true
        },
        files: {
          "path/to/result.css": "path/to/source.less"
        }
      }
      */
    },
    stitch: {
      options: {
        paths: [
          'frontend/scripts'
        ],
        dependencies: [
          'frontend/components/bacon/dist/Bacon.js'
        ],
        dest: 'public/assets/scripts/app.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'server/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['server/**/*', 'fontend/**/*'],
      tasks: ['jshint', 'stitch']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-stitch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('batch', ['less', 'stitch']);
  grunt.registerTask('server', ['concurrent']);

};
