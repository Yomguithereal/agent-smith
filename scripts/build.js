var browserify = require('browserify'),
    reactify = require('reactify'),
    es6ify = require('es6ify'),
    watchify = require('watchify'),
    fs = require('fs');

var opts = {
  debug: true,
  entries: [__dirname + '/../js/main.jsx'],
  standalone: 'app',
  cache: {},
  packageCache: {},
  fullPaths: true
};

var bundler = browserify(opts)
    .transform(reactify)
    .transform(es6ify.configure(/.jsx?/))
    .external('react')
    .external(__dirname + '/../js/lib/sigma.js');

var watcher = watchify(bundler);

function pad(i) {
  if (('' + i).length < 2)
    return '0' + i;
  else
    return '' + i;
}

function build(firstTime) {

  var write = fs.createWriteStream(__dirname + '/../build/app.build.js', {encoding: 'utf-8'});

  watcher.bundle()
    .on('end', function() {
      var d = new Date();

      write.end();
      console.log(pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds())+ ' Bundle updated.');
    })
    .on('error', function(err) {
      write.end();
      console.log(err);
    })
    .pipe(write);
}

// Watching
watcher.on('update', function() {
  build();
});

// Building first time
build();
