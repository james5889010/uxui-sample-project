var gulp = require("gulp"),                  // Gulp itself.
    rimraf = require("rimraf"),              // For deleting folders recursively.
    concat = require("gulp-concat"),         // For file concatenation.
    cssmin = require("gulp-cssmin"),         // For CSS minification.
    uglify = require("gulp-uglify");         // For JS uglification. 

paths = {};
paths.js = "./public/**/*.js";
paths.minJs = "./public/**/*.min.js";
paths.css = "./public/**/*.css";
paths.minCss = "./public/**/*.min.css";
paths.concatJsDest = "./public/site.min.js";
paths.concatCssDest = "./public/site.min.css";

// Tasks to clean folders and files.
gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

// Tasks to minify CSS files and uglify JS files.
gulp.task("min:js", function () {
    gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
gulp.task("clean", ["clean:js", "clean:css"]);
gulp.task("default", ["clean:js","clean:css","min:js","min:css"]);