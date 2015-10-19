var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var streamify = require('gulp-streamify');
var browserifycss = require('browserify-css');

var src_path = './src/';
var dist_path = './app/public/';

gulp.task('browserify', function() {
	browserify(src_path + 'js/main.jsx', { debug: true })
		.transform(babelify.configure({
			optional: ["es7.asyncFunctions", "runtime"]
		}))
		.transform(browserifycss, {global: true})
		.bundle()
		.on("error", function (err) { console.log("Error : " + err.message); })
		.pipe(source('main.js'))
		.pipe(streamify(uglify({preserveComments: 'some'})))
		.pipe(gulp.dest(dist_path + 'js/'));
});

gulp.task('sass', function () {
	gulp.src(src_path + 'css/**/*.sass')
	    .pipe(sass.sync().on('error', sass.logError))
	    .pipe(gulp.dest(dist_path + 'css/'));
});

gulp.task('watch', function() {
	gulp.watch(src_path + 'js/**/*.jsx', ['browserify']);
	gulp.watch(src_path + 'js/**/*.js', ['browserify']);
	gulp.watch(src_path + 'css/**/*.sass', ['sass']);
});

gulp.task('default', ['browserify', 'sass', 'watch']);
