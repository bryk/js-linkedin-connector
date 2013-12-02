// Generated on 2013-10-31 using generator-angular 0.5.1
'use strict';

var LIVERELOAD_PORT = 35729;;
var server = require('./server');



module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  grunt.loadNpmTasks('grunt-jasmine-node');
  var serverConfig = server.serverConfig;

  grunt.initConfig({
    serverConfig: serverConfig,
    watch: {
      styles: {
        files: ['<%= serverConfig.appStatic %>/styles/**/*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= serverConfig.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '{.tmp,<%= serverConfig.appStatic %>}/scripts/**/*.js',
          '<%= serverConfig.appStatic %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '**/*.css',
            dest: '.tmp/styles/'
          }
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: LIVERELOAD_PORT
      },
      dev: {
        options: {
          open: true,
          middleware: function (connect) {
            return server.getMiddlewares(connect, ['tmp', serverConfig.appStatic], serverConfig.app);
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return server.getMiddlewares(connect, ['tmp', 'test', serverConfig.appStatic], serverConfig.app);
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return server.getMiddlewares(connect, [serverConfig.distStatic], serverConfig.dist);
          }
        }
      }
    },
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= serverConfig.dist %>/*',
              '!<%= serverConfig.dist %>/.git*'
            ]
          }
        ]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'server.js',
        '<%= serverConfig.appStatic %>/scripts/**/*.js',
        '<%= serverConfig.server %>/**/*.js',
        '<%= serverConfig.serverTest %>/**/*.js'
      ]
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= serverConfig.distStatic %>/login/**/*.{js,css}',
            '<%= serverConfig.distStatic %>/app/**/*.{js,css}',
            '<%= serverConfig.distStatic %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= serverConfig.distStatic %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: ['<%= serverConfig.app %>/app.html', '<%= serverConfig.app %>/login.html'],
      options: {
        dest: '<%= serverConfig.distStatic %>'
      }
    },
    usemin: {
      html: ['<%= serverConfig.dist %>/{,*/}*.html'],
      css: ['<%= serverConfig.distStatic %>/styles/**/*.css'],
      options: {
        assetsDirs: ['<%= serverConfig.distStatic %>']
      }
    },
    htmlmin: {
      dist: {
        options: {
          /* removeCommentsFromCDATA: true,
           collapseBooleanAttributes: true,
           removeAttributeQuotes: true,
           removeRedundantAttributes: true,
           useShortDoctype: true,
           removeEmptyAttributes: true,
           removeOptionalTags: true */
        },
        files: [
          {
            expand: true,
            cwd: '<%= serverConfig.app %>',
            src: ['*.html', 'static/app/**/*.html', 'static/login/**/*.html'],
            dest: '<%= serverConfig.dist %>'
          }
        ]
      }
    },
    // Put files not handled in other tasks here
    uglify: {
      options: {
        banner: 'window.APP_DEBUG = false;'
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= serverConfig.app %>',
            dest: '<%= serverConfig.dist %>',
            src: [
              '*.{ico,png,txt}',
              'static/bower_components/**/*',
              'static/images/**/*.{gif,webp}',
              'static/styles/fonts/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= serverConfig.distStatic %>/images',
            src: [
              'generated/*'
            ]
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= serverConfig.appStatic %>/styles',
        dest: '.tmp/styles/',
        src: '**/*.css'
      }
    },
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
      //e2e: {
      //  configFile: 'karma-e2e.conf.js',
      //  singleRun: true
      //}
    },
    ngmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= serverConfig.dist %>/',
            src: ['static/app/**/*.js', 'static/login/**/*.js'],
            dest: '<%= serverConfig.dist %>/'
          }
        ]
      }
    },
    /* jshint camelcase: false */
    jasmine_node: {
      specNameMatcher: 'Spec',
      projectRoot: './server_test',

      forceExit: true
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:dev',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'jasmine_node',
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
  grunt.registerTask('heroku', ['build']);
};
