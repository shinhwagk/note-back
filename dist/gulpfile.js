var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("."));
});

gulp.task('watch', ['default'], function () {
    gulp.watch(['app.ts'], ['default']).on('change', function (e) {
        console.info(e.path)
    })
});