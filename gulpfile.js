var gulp = require('gulp'),
	babel = require('gulp-babel'),
	autoprefixer = require('gulp-autoprefixer'),
 //   uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	cssmin = require("gulp-cssmin"),
	rename = require("gulp-rename"),
    concat = require('gulp-concat');

    gulp.task('css', () => {
        return gulp.src('src/css/*.css')
            .pipe(concat('main.css'))
            .pipe(cssmin())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('dist/css'));
    });

	gulp.task('js', () => {
		return gulp.src('src/js/*.js')
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(gulp.dest('dist/js'));
	});

 //   gulp.task('js', () => {
 //     return gulp.src('src/js/**/*.js')
 //       .pipe(concat('main.js'))
 //       .pipe(gulp.dest('dist/scripts'))
 //       .pipe(rename({ suffix: '.min' }))
 //       .pipe(uglify())
 //       .pipe(gulp.dest('dist/js'))
 //   });

	gulp.task('watch', () => {
        gulp.watch('src/css/*.css', ['css']);
        gulp.watch('src/js/*.js', ['js']);
    });
	gulp.task('default', ['css', 'js', 'watch']);
 //   gulp.task('scripts', ['js', 'watch']);
