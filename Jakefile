var fs = require('fs'),
    Haml = require('haml'),
    package = require('./package.json');

desc('Build the index.html page');
task('build-html', function () {
  fs.readFile('./templates/index.haml', 'utf8', function (error, data) {
    if (error) throw error;
    console.log('Loaded HAML template');

    fs.stat("./bundle.js", function (error, jsStats) {
      if (error) throw error;
      console.log('JS bundle mtime: ' + jsStats.mtime);

      fs.stat("./bundle.css", function (error, cssStats) {
        if (error) throw error;
        console.log('CSS bundle mtime: ' + cssStats.mtime);

        var template = Haml(data),
            args = { package: package,
                     jsLastModified: jsStats.mtime.getTime(),
                     cssLastModified: cssStats.mtime.getTime() };

        fs.writeFile('./index.html', template(args), function (error) {
          if (error) throw error;
          console.log('Wrote HTML file');
        });
      });
    });
  });
});
