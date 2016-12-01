var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/main.ts',
  output: {
    path: './lib',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'app/**/*.html', to: 'app' },
      { from: 'app/**/*.css', to: 'app' }
    ]),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'Note Back',
      inject: 'head'
    })]
};