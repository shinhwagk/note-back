const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: 'main.min.js'
  },
  devServer: { inline: true },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ loader: "css-loader" }) }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ inject: 'body', hash: true, favicon: "favicon.ico" }),
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    })
  ]
};