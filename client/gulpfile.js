var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
  gulp.watch('js/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
