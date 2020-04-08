var gulp = require('gulp'),
    Server__Sync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'), 
	html = require('gulp-html-replace'), 
	autoprefixer  = require('gulp-autoprefixer'), 
	sass = require('gulp-sass');

gulp.task('server', function(){
    Server__Sync.init({
        server: {
            baseDir: 'dist',
        },
        port: 3000, //define a porta, você pode mudar para a que quiser
        startPath: '/', //define qual é o arquivo que abrirá como padrão quando ele iniciar
    });
    gulp.watch('./src/**/*').on('change', Server__Sync.reload); // Servidor Up
    var wather = gulp.watch(['src/**/*.html','src/sass/*.scss', 'src/js/*.js', 'src/img/*'], gulp.series('html', 'sass', 'js', 'imagemin')); // Pega Todas as funções
    
    // Escuta todas as funções 
    wather.on('change', Server__Sync.reload);  
}); 

// Replace html 
gulp.task('html', function() {

    gulp.src('src/**/*.html')
        .pipe(html())
        .pipe(gulp.dest('dist/'));
}); // Replace html 

// Comprime img
gulp.task('imagemin', function(){
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));	
});// Comprime img

// Compila e comprime sass
gulp.task('sass', function(){
    return gulp.src('src/sass/*.scss')
        // Gera css para todos navegadores
        .pipe(autoprefixer({
            cascade: false
        }))
		.pipe(sass({
			outputStyle: "compressed" 
        })) 
		.pipe(gulp.dest('dist/css/'))
}); // Compila e comprime sass
  
// Compila e comprime js
gulp.task('js', function(){
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
}); // Compila e comprime js
 



