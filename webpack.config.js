var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: { app: './app/src/app.ts' },
  output: {
    filename: 'bundle.js',
    path: './dist',
    library: 'nlib',
    libraryTarget: "var"
  },
  externals: {
    "jquery": "$"
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'note-back-edit',
    filename: 'index.html',
    template: './app/html/index.html',
    inject: "body"
  })]
}