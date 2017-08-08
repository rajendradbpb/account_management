module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['app.js']
    },
    watch: {
      scripts: {
        files: ['app.js','server/*.js','server/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true,
          spawn: false,
        },
      },
      css: {
        files: ['**/*.css'],
        options: {
          livereload: true,
        }
      },
    },
    nodemon: {
      dev: {
        script: './bin/www',
        tasks: ['watch']
      }
    },
    concat: {
      options: {
        separator: ';',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today() %> */\n',
      },
      dist: {
        src: [
          "public/main_app.js",
          "public/directive/*.js",
          "public/controller/*.js",
          "public/services/*.js",


        ],
        dest: 'public/built.js',
      },
    },

  });

  // loading tasks modules
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks("grunt-concurrent")


  // registerTask
  grunt.registerTask("default", ["concat","nodemon:dev"]);
  grunt.registerTask("con", ['concat']);
};
