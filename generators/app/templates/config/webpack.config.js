'use strict'; // eslint-disable-line strict

// Webpack and node related dependencies
const path = require('path');
const webpack = require('webpack');

// Plugins and modules
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const DEV = process.env.NODE_ENV === 'development';
<% if (!opt.modules) { %>
let styleLoader = 'css?minimize!postcss!sass';
<% } else { %>
let styleLoader = 'css?camelCase&modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!postcss!sass';
<% } %>

<% if (opt.server) { %>
if (DEV) {
  styleLoader = `style!${styleLoader}`;
} else {
  styleLoader = ExtractTextPlugin.extract(styleLoader);
}
<% } else { %>
styleLoader = ExtractTextPlugin.extract(styleLoader);
<% } %>

const config = {
  plugins: [
    new ExtractTextPlugin('style.min.css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'app/index.html')
    })
  ],

  target: '<%= opt.web %>', // https://webpack.github.io/docs/configuration.html#target

  entry: {
    app: [
      path.join(__dirname, '..', 'app/script/application.js')
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'script.min.js',
    publicPath: '/'
  },

  resolve: {
    root: [
      path.join(__dirname, '..', 'app/script'),
      path.join(__dirname, '..', 'app/style'),
      path.join(__dirname, '..', 'app/assets')
    ],
    modulesDirectories: [
      'node_modules'
    ]
  },

  postcss: [autoprefixer],

  sassLoader: {
    includePaths: [
      path.join(__dirname, '..', 'app/style')
    ]
  },

  module: {
    loaders: [
    <% if (opt.babel) { %>
    {
      test: /\.js?$/,
      exclude: /(node_modules|vendor)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    },
    <% } %>
    {
      test: /\.(scss|css)$/,
      loader: styleLoader
    }, {
      test: /\.(png|svg|eot|ttf|woff)$/,
      loader: 'file-loader'
    }]
  }
};

<% if (opt.server) { %>
if (DEV) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.entry.app.push('webpack/hot/dev-server');
} else {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}
<% } else { %>
config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
<% } %>

module.exports = config;
