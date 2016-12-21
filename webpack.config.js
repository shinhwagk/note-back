var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: './docs',
    filename: 'main.min.js'
  },
  devServer: { inline: true },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head'
    })    
  ]
};