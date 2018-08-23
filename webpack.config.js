const path = require('path');
const webpack = require('webpack');

const webpackBaseConfig = require('./webpack.base.config.js');


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'source-map',
  output: Object.assign({}, webpackBaseConfig.output, {
    filename: 'js/[name]-[chunkhash].js',
    sourceMapFilename: 'maps/[file].map',
  }),
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
