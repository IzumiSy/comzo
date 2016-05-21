var gulp = require('gulp')
var server = require('gulp-webserver')

gulp.task('default', ['server'])
gulp.task('server', function() {
  gulp.src('./app/')
    .pipe(server({
      port: 8000,
      open :true
    }))
})
