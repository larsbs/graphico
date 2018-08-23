const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');


function resolve(...paths) {
  return path.resolve(__dirname, ...paths);
}


if ( ! process.env.NODE_ENV) {
  console.error('No NODE_ENV specified');
  process.exit(1);
}


const IS_DEV = process.env.NODE_ENV === 'development';


module.exports = {
  mode: process.env.NODE_ENV,
  resolve: {
    modules: [ 'node_modules' ],
    extensions: ['.js', '.jsx', '.less'],
    alias: {
      '~': resolve('app/renderer'),
    },
    symlinks: false,  // Disable to allow resolve peerDependencies in symlinked packages
  },
  entry: {
    main: [
      'modern-normalize/modern-normalize.css',
      './app/renderer/app.js',
    ],
  },
  output: {
    path: resolve('app/dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    sourceMapFilename: 'js/[name].js.map',
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: 'app/index.html',
      inject: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  externals: {
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [ resolve('app') ],
        use: [ 'babel-loader' ],
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              importLoaders: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              strictMath: true,
            },
          },
        ],
      },
      {
        test: /\.(otf|woff|ttf|eot)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.flow$/,
        loader: 'ignore-loader',  // ignore graphiql warnings
      },
    ],
  },
};
