var $ = require('broccoli-load-plugins')();

var html = $.jade($.staticCompiler('src', {
  srcDir: '/',
  files: ['**/*.jade'],
  destDir: '/'
}), {
  filename: 'src/includes'
});

var css = 'src/css';
css = $.sass([css], 'bootstrap.scss', '/css/bootstrap.css');
css = $.fileMover(css, {
  srcFile: '/css/bootstrap.css',
  destFile: '/css/bootstrap.min.css',
  copy: true
});

var minCss = $.csso($.staticCompiler(css, {
  srcDir: '/',
  files: ['**/bootstrap.min.css'],
  destDir: '/'
}));

var font = $.staticCompiler('bower/bootstrap-sass-official/vendor/assets/fonts', {
  srcDir: '/',
  destDir: '/css'
});

module.exports = $.mergeTrees([html, css, minCss, font], { overwrite: true });
