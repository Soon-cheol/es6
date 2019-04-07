const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('default', function() {
    // ESLint 를 실행합니다.
    gulp.src(["/es6/**/*.js", "public/es6/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format());
    // 노드 소스
    gulp.src("es6/**/*.js") // es6 파일을 모두 선택
        .pipe(babel()) // 선택한 파일을 파이프로 바벨에 연결 -> ES6 > ES5 로 변환
        .pipe(gulp.dest("dist")); // 변환 파일 dist 디렉터리에 파일 저장
    // 브라우저 소스
    gulp.src("public/es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist"));
});