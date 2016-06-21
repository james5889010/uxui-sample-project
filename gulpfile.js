var gulp = require("gulp"),                  // Gulp itself.
    rimraf = require("rimraf"),              // For deleting folders recursively.
    concat = require("gulp-concat"),         // For file concatenation.
    cssmin = require("gulp-cssmin"),         // For CSS minification.
    uglify = require("gulp-uglify");         // For JS uglification. 
    sass = require("gulp-sass");

paths = {};
paths.js = "./public/**/*.js";
paths.minJs = "./public/**/*.min.js";
paths.css = "./public/**/*.css";
paths.minCss = "./public/**/*.min.css";
paths.concatJsDest = "./public/javascript/site.min.js";
paths.concatCssDest = "./public/stylesheets/site.min.css";
paths.scss = "./public/**/*.scss";
paths.scssCssDest = "./public"

// Tasks to clean folders and files.
gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

// Tasks to minify CSS files and uglify JS files.
gulp.task("min:js", ["clean:js"], function () {
    gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("sass:css", function () {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.scssCssDest));
});

gulp.task("min:css", ["sass:css"], function () {
    gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("watch", function() {
    gulp.watch([paths.js, paths.css, paths.scss], ["default"]);
});

gulp.task("min", ["min:js", "min:css"]);
gulp.task("clean", ["clean:js", "clean:css"]);
gulp.task("default", ["clean:js","clean:css","sass:css","min:js","min:css"]);