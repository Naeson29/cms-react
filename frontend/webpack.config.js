const webpack = require('webpack');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: SRC_DIR + '/app/index.js',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    publicPath: '/app/',
  },
  module: {
    loaders: [{
      test: /\.js?/,
      include: SRC_DIR,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-2'],
      },
    }],
  },

  plugins: [
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin(
          {
              inject: true,
              template: './src/index.html',
              filename : DIST_DIR + '/index.html'
          }
      )
  ]
};

module.exports = config;
