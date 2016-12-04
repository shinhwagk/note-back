var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/main.ts',
  output: {
    path: './docs',
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'app/**/*.html', to: '.' },
      { from: 'app/**/*.css', to: '.' },
      { from: 'styles.css', to: '.' }
    ]),
    new HtmlWebpackPlugin({
      template: 'webpack.template.html',
      title: 'Note Back',
      inject: 'head'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    })]
};
