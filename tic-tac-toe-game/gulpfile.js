var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('build-sass', function(){
    "use strict";
    return gulp.src('./assets/styles/src/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./assets/styles/dist'));
});

gulp.task('default', ['build-sass']);