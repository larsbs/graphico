const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CopyPlugin = require('copy-webpack-plugin');


function resolve(...paths) {
  return path.resolve(__dirname, ...paths);
}


if ( ! process.env.NODE_ENV) {
  console.error('ERROR: Missing environment variable. Make sure to load the .env file before running this command.');
  process.exit(1);
}


module.exports = {
  resolve: {
    modules: [ 'node_modules', resolve('vendor') ],
    extensions: ['.js', '.jsx', '.less'],
    alias: {
      '~': resolve('app', 'renderer'),
    },
    symlinks: false,  // Disable to allow resolve peerDependencies in symlinked packages
  },
  entry: {
    main: [
      '@babel/polyfill',
      'react-hot-loader/patch',
      './app/renderer/app.js',
    ],
  },
  output: {
    path: resolve('app', 'dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    sourceMapFilename: 'js/[name].js.map',
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: 'app/index.html',
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyPlugin([
      { from: 'node_modules/graphiql/graphiql.css', to: 'styles/graphiql.css' },
    ]),
  ],
  externals: {
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [ resolve('app'), resolve('vendor') ],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              importLoaders: 1,
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
