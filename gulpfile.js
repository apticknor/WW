// ----------------------------------------------------------------------------
// Gulp all the things!
// ----------------------------------------------------------------------------
var gulp        = require('gulp'),
    notify      = require('gulp-scsslint'),
    scsslint    = require('gulp-scsslint'),

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
        .pipe(notify({ message: 'SCSS Lint Complete' }));
});

// ----------------------------------------------------------------------------
// Default Tasks
// ----------------------------------------------------------------------------
gulp.task('default', [
    'scsslint',
]);