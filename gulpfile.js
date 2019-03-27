var gulp = require("gulp");
var sass = require("gulp-sass");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var autoprefixer = require("gulp-autoprefixer");

    gulp.task("sass", function() {
        gulp.src("css/style.sass")
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulp.dest("./"))
            .pipe(browser.reload({stream:true}))
    });
    gulp.task("server", function() {
    browser({
        notify: true,
        port: 3000,
        server: {
            baseDir: "./",
            index  : 'index.html'
        }
        });
    });
    
    gulp.task("default",['server'], function() {
        gulp.watch("css/*.sass",["sass"])
        gulp.watch('**/*.html').on('change', browser.reload);
});
