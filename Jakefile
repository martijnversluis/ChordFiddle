var fs = require('fs'),
    Haml = require('haml'),
    async = require('async'),
    marked = require('marked'),
    package = require('./package.json');

desc('Build the index.html page');
task('build-html', function () {
  async.waterfall([
    function (callback) {
      fs.readFile('./templates/index.haml', 'utf8', function (error, hamlData) {
        if (!error) console.log('Loaded HAML template');
        callback(error, hamlData);
      })
    },

    function (hamlData, callback) {
      fs.readFile('./README.md', 'utf8', function (error, readmeMarkdown) {
        if (!error) console.log('Loaded README markdown template');
        callback(error, hamlData, readmeMarkdown);
      });
    },

    function (hamlData, readmeMarkdown, callback) {
      fs.readFile('./example.chordpro', 'utf8', function (error, exampleChordProSheet) {
        if (!error) console.log('Loaded example Chordpro chord sheet');
        callback(error, hamlData, readmeMarkdown, exampleChordProSheet);
      });
    },

    function (hamlData, readmeMarkdown, exampleChordProSheet, callback) {
      fs.stat("./bundle.js", function (error, jsStats) {
        if (!error) console.log('JS bundle mtime: ' + jsStats.mtime);
        callback(error, hamlData, readmeMarkdown, exampleChordProSheet, jsStats);
      });
    },

    function (hamlData, readmeMarkdown, exampleChordProSheet, jsStats, callback) {
      fs.stat("./bundle.css", function (error, cssStats) {
        if (!error) console.log('CSS bundle mtime: ' + cssStats.mtime);
        callback(error, hamlData, readmeMarkdown, exampleChordProSheet, jsStats, cssStats);
      });
    },

    function (hamlData, readmeMarkdown, exampleChordProSheet, jsStats, cssStats, callback) {
      var template = Haml(hamlData),
          args = { package: package,
                   jsLastModified: jsStats.mtime.getTime(),
                   cssLastModified: cssStats.mtime.getTime(),
                   readmeHTML: marked(readmeMarkdown),
                   exampleChordProSheet: exampleChordProSheet };

      fs.writeFile('./index.html', template(args), function (error) {
        if (!error) console.log('Wrote HTML file');
        callback(error);
      });
    }
  ]);
});
