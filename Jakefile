var fs = require('fs'),
    Haml = require('haml'),
    async = require('async'),
    marked = require('marked'),
    package = require('./package.json'),
    assign = require('fast.js').assign;

desc('Build the index.html page');
task('build-html', function () {
  async.waterfall([
    function (callback) {
      fs.readFile('./templates/index.haml', 'utf8', function (error, hamlData) {
        if (!error) console.log('Loaded HAML template');
        callback(error, { hamlData: hamlData });
      })
    },

    function (data, callback) {
      fs.readFile('./README.md', 'utf8', function (error, readmeMarkdown) {
        if (!error) console.log('Loaded README markdown template');
        var readmeHTML = marked(readmeMarkdown);
        callback(error, assign(data, { readmeHTML: readmeHTML }));
      });
    },

    function (data, callback) {
      fs.readFile('./example.chordpro', 'utf8', function (error, exampleChordProSheet) {
        if (!error) console.log('Loaded example Chordpro chord sheet');
        callback(error, assign(data, { exampleChordProSheet: exampleChordProSheet }));
      });
    },

    function (data, callback) {
      fs.stat('./bundle.js', function (error, jsStats) {
        if (!error) console.log('JS bundle mtime: ' + jsStats.mtime);
        var jsLastModified = jsStats.mtime.getTime();
        callback(error, assign(data, { jsLastModified: jsLastModified }));
      });
    },

    function (data, callback) {
      fs.stat('./bundle.css', function (error, cssStats) {
        if (!error) console.log('CSS bundle mtime: ' + cssStats.mtime);
        var cssLastModified = cssStats.mtime.getTime();
        callback(error, assign(data, { cssLastModified: cssLastModified }));
      });
    },

    function (data, callback) {
      var template = Haml(data.hamlData),
          args = assign(data, { package: package });

      fs.writeFile('./index.html', template(args), function (error) {
        if (!error) console.log('Wrote HTML file');
        callback(error);
      });
    }
  ]);
});
