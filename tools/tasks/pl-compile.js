const gulp = require('gulp');
var exec = require('child_process').exec;

function compile(done) {
  exec('php ./tools/pattern-lab/core/console --generate', function(err, stdout, stderr) {
    console.log(stdout);

    if (err) {
      console.log(stderr);
      return false;
    }
    done();
  });

  done();
}

/**
 * Gulp task for auto-namespacing.
 */
module.exports = {
  plCompile: function(gulp) {
    gulp.task('pl-compile', (done) => {
      compile(() => {
        done();
      });
    });
  }
};