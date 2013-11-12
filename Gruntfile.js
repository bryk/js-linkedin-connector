// Generated on 2013-10-31 using generator-angular 0.5.1
'use strict';

var LIVERELOAD_PORT = 35729;
var path = require('path');
var redirectAugumentMiddleware = require('./server/redirectAugumentMiddleware').redirectAugumentMiddleware;
var loginRedirectMiddleware = require('./server/loginRedirectMiddleware').loginRedirectMiddleware;
var loginApplicationMiddleware = require('./server/loginApplicationMiddleware').loginApplicationMiddleware;
var loggedApplicationMiddleware = require('./server/loggedApplicationMiddleware').loggedApplicationMiddleware;
var passport = require('passport');

var mountFolder = function (connect, dir) {
  return connect.static(path.resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/**/*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var yeomanConfig ={
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      server: 'server',
      serverTest: 'server_test'
    };
  yeomanConfig.appStatic = yeomanConfig.app + path.sep + 'static';
  yeomanConfig.distStatic = yeomanConfig.dist + path.sep + 'static';

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      styles: {
        files: ['<%= yeoman.appStatic %>/styles/**/*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '{.tmp,<%= yeoman.appStatic %>}/scripts/**/*.js',
          '<%= yeoman.appStatic %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
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
          middleware: function(connect){
            return [
              connect.logger(),
              connect.bodyParser(),
              connect.cookieParser(),
              connect.query(),
              connect.session({secret: 'secret'}),
              passport.initialize(),
              passport.session(),
              redirectAugumentMiddleware,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.appStatic),
              loginRedirectMiddleware,
              loginApplicationMiddleware(yeomanConfig.app),
              loggedApplicationMiddleware(yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect){
            return [
              connect.logger(),
              connect.bodyParser(),
              connect.cookieParser(),
              connect.query(),
              connect.session({secret: 'secret'}),
              passport.initialize(),
              passport.session(),
              redirectAugumentMiddleware,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, '.test'),
              mountFolder(connect, yeomanConfig.appStatic),
              loginRedirectMiddleware,
              loginApplicationMiddleware(yeomanConfig.app),
              loggedApplicationMiddleware(yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function(connect){
            return [
              connect.logger(),
              connect.bodyParser(),
              connect.cookieParser(),
              connect.query(),
              connect.session({secret: 'secret'}),
              passport.initialize(),
              passport.session(),
              redirectAugumentMiddleware,
              mountFolder(connect, yeomanConfig.distStatic),
              loginRedirectMiddleware,
              loginApplicationMiddleware(yeomanConfig.dist),
              loggedApplicationMiddleware(yeomanConfig.dist)
            ];
          }
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.appStatic %>/scripts/**/*.js',
        '<%= yeoman.server %>/**/*.js',
        '<%= yeoman.serverTest %>/**/*.js'
      ]
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.distStatic %>/login/**/*.{js,css}',
            '<%= yeoman.distStatic %>/app/**/*.{js,css}',
            '<%= yeoman.distStatic %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.distStatic %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: ['<%= yeoman.app %>/app.html', '<%= yeoman.app %>/login.html'],
      options: {
        dest: '<%= yeoman.distStatic %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.distStatic %>/styles/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.distStatic %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.appStatic %>/images',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= yeoman.distStatic %>/images'
        }]
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
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'static/app/**/*.html', 'static/login/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
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
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            'static/bower_components/**/*',
            'static/images/**/*.{gif,webp}',
            'static/styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.distStatic %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.appStatic %>/styles',
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
        'imagemin',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/',
          src: ['static/app/**/*.js', 'static/login/**/*.js'],
          dest: '<%= yeoman.dist %>/'
        }]
      }
    },
    /* jshint camelcase: false */
    jasmine_node:{
      specNameMatcher: 'spec',
      projectRoot: './server_test',
      requirejs: false,
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
};
