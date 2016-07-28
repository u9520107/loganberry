import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import webpack from 'webpack';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import distConfig from './webpack.config';

gulp.task('pre-coverage', () => (
  gulp.src('src/**/*.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: babelIstanbul.Instrumenter,
    }))
    .pipe(istanbul.hookRequire())
));

gulp.task('coverage', ['pre-coverage'], () => (
  gulp.src('test/**/*.js')
    .pipe(mocha())
    .pipe(istanbul.writeReports())
));

gulp.task('test', () => (
  gulp.src('test/**/*.js')
    .pipe(mocha())
));

gulp.task('build', () => (
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'))
));

gulp.task('dist', async () => {
  await new Promise((resolve, reject) => {
    webpack(distConfig, err => {
      if (err) reject(err);
      resolve();
    });
  });
  await new Promise((resolve, reject) => {
    distConfig.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
    ];
    distConfig.output.filename = 'ringcentral-js-integration-commons.min.js';
    webpack(distConfig, err => {
      if (err) reject(err);
      resolve();
    });
  });
});
