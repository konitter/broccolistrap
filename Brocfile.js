var $ = require('broccoli-load-plugins')();

var html = $.jade($.select('src', {
  acceptFiles: ['**/*.jade'],
  rejectFiles: ['includes/*.jade']
}), {
  basedir: 'src'
});

var css = 'src/css';
css = $.sass([css], 'bootstrap.scss', '/css/bootstrap.css');
css = $.fileMover(css, {
  srcFile: '/css/bootstrap.css',
  destFile: '/css/bootstrap.min.css',
  copy: true
});

var mincss = $.csso($.select(css, {
  acceptFiles: ['**/bootstrap.min.css']
}));

var font = $.select('bower/bootstrap-sass-official/vendor/assets/fonts', {
  outputDir: '/css'
});

module.exports = $.mergeTrees([html, css, mincss, font], { overwrite: true });