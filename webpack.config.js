import path from 'path';

export default {
  entry: [
    path.resolve(__dirname, 'src/loganberry.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'loganberry.js',
    libraryTarget: 'umd',
    library: 'LoganBerry',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/i,
        loader: 'json',
      },
    ],
  },
};
