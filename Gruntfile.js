module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['app.js']
    },
    watch: {
      server: {
        files: ['app.js','server/*.js','server/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true,
          spawn: false,
        },
      },
      client: {
        files: ['public/*.js','public/**/*.js'],
        tasks: ['concat:client'],
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
      start: {
        script: './bin/www',
        tasks: ["concat:client","watch:client"]
      },
      watch: {
        script: './bin/www',
        tasks: ['watch:server']
      }
    },
    concat: {
      options: {
        separator: ';',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today() %> */\n',
      },
      client: {
        src: [

          "public/main_app.js",
          "public/constants.js",
          "public/modules/*.js",
          "public/modules/**/.js",
          "public/main_app.js",
          "public/directive/*.js",
          "public/directive/**/*.js",
          "public/controller/*.js",
          "public/controller/**/*.js",
          "public/services/*.js",
          "public/services/**/*.js",
        ],
        dest: 'public/dist/built.js',
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
  grunt.registerTask("serverwatch", ["concat:client","nodemon:dev"]);
  grunt.registerTask("start", ["nodemon:start"]);
  grunt.registerTask("client", ["concat:client","watch:client"]);
  grunt.registerTask("con", ['concat']);
};
