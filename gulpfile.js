var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig_api.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('watch', ['default'], function () {
    gulp.watch(['api/*.ts'], ['default']).on('change', function (e) {
        console.info(e.path)
    })
});