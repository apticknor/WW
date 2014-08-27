// ----------------------------------------------------------------------------
// Gulp all the things!
// ----------------------------------------------------------------------------
var gulp        = require('gulp'),
    clean       = require('gulp-clean'),
    rename      = require('gulp-rename'),
    notify      = require('gulp-notify'),
    scsslint    = require('gulp-scsslint'),
    sass        = require('gulp-ruby-sass'),
    cssmin      = require('gulp-cssmin'),

    // ----------------------------------------------------------------------------
    // Paths
    // ----------------------------------------------------------------------------

    base = '/Users/apticknor/_projects/WW/',
    source = base + 'src/',
    build = base + 'web/',

    paths = {
        sassSource: source + 'assets/scss/**/*.scss',
        sassFile:   source + 'assets/scss/modern.scss',
        sassTarget: build + 'assets/styles/',
    };

// ----------------------------------------------------------------------------
// CSS Tasks
// ----------------------------------------------------------------------------
gulp.task('scsslint', function () {
    return gulp.src(paths.sassSource)
        .pipe(scsslint({
            config: base + '.scss-lint.yml'
        }))
        .pipe(scsslint.reporter())
        .pipe(notify({
            onLast: true,
            message: 'SCSS Lint Complete'
        }));
});

gulp.task('clean-css', function () {
    return gulp.src(paths.sassTarget, { read: false })
        .pipe(clean())
        .pipe(notify({
            message: 'CSS Clean Complete'
        }));
});

gulp.task('css', ['scsslint', 'clean-css'], function () {
    return gulp.src(paths.sassSource)
        .pipe(sass({
            style: 'expanded',
            precision: 6,
            noCache: true
        }))
        .pipe(gulp.dest(paths.sassTarget))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.sassTarget))
        .pipe(notify({
            onLast: true,
            message: 'CSS build task complete'
        }));
});

// ----------------------------------------------------------------------------
// Default Tasks
// ----------------------------------------------------------------------------
gulp.task('default', [
    'css'
]);