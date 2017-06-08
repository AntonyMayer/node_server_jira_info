var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babel = require('babelify'),
    sass = require('gulp-sass');

//dirs
var jsSrc = './src/js/app.js',
    jsDest = './public/js',
    cssSrc = './src/scss/style.scss',
    cssDest = './public/css';

//JS
function compile(watch) {
    var bundler = watchify(browserify(jsSrc, { debug: true }).transform(babel));

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle(bundler);
        });
    }

    rebundle(bundler);
}

function rebundle(bundler) {
    bundler.bundle()
        .on('error', function(err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsDest));
}

//CSS
gulp.task('sass', function() {
    return gulp.src(cssSrc)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write(`./maps`))
        .pipe(gulp.dest(cssDest));
});

//Default
gulp.task('build', compile());
gulp.task('watch', (() => {
    compile(true);
    gulp.watch(cssSrc, ['sass']);
})());

gulp.task('default', ['watch']);