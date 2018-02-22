const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


function resolve(...paths) {
  return path.resolve(__dirname, ...paths);
}


if ( ! process.env.NODE_ENV) {
  console.error('ERROR: Missing environment variable. Make sure to load the .env file before running this command.');
  process.exit(1);
}


module.exports = {
  resolve: {
    modules: [ 'node_modules', resolve('../') ],
    extensions: ['.js', '.jsx', '.less'],
    symlinks: false,  // Disable to allow resolve peerDependencies in symlinked packages
  },
  entry: {
    'custom-graphiql': [
      '@babel/polyfill',
      './vendor/custom-graphiql/index.js',
    ],
  },
  output: {
    library: 'CustomGraphiQL',
    libraryTarget: 'umd',
    path: resolve('dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    sourceMapFilename: 'js/[name].js.map',
  },
  plugins: [
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
    new ExtractTextPlugin('styles/[name].css'),
  ],
  externals: {
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [ resolve('src') ],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
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
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
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
          ]
        }),
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
