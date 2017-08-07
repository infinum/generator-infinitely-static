const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const routes = require('./routes.json');
const {
  generateStyleLoader,
  resolveFileName,
  resolveTemplate
} = require('./webpack.helpers');
const DEV = process.env.NODE_ENV !== 'production';

const config = {
  context: path.join(__dirname),

  entry: {
    app: ['./app/scripts/index.js']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: DEV ? '[name].js' : '[name]-[hash].min.js',
    publicPath: '/'
  },

  resolve: {
    modules: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'app'),
      path.resolve(__dirname, 'app/scripts'),
      path.resolve(__dirname, 'app/styles'),
      path.resolve(__dirname, 'app/assets'),
      path.resolve(__dirname, 'app/templates'),
      'node_modules'
    ]
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader'
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader',
      query: {
        inlineRequires: 'images\/|videos',
        helperDirs: path.resolve(__dirname, 'app/templates/helpers'),
        partialDirs: path.resolve(__dirname, 'app/templates')
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(jpg|png|svg|eot|ttf|woff)$/,
      loader: 'file-loader'
    },
      generateStyleLoader()
    ]},

  plugins: [
    new webpack.DefinePlugin({
      _DEV_: DEV
    })
  ],

  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0'
  }
};

if (!DEV) {
  config.plugins = [
    ...config.plugins,
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css')
  ];
}

if (routes) {
  Object.keys(routes)
    .filter((route) => route !== 'default')
    .map((routeName) => routes.hasOwnProperty(routeName)
      ? {
        template: resolveTemplate(routeName),
        filename: resolveFileName(routes[routeName].route),
        context: routes[routeName].context || {}
      }
      : null
    )
    .filter((file) => file)
    .forEach((page) => {
      config.plugins.push(
        new HtmlWebpackPlugin(page)
      );
    });
}

module.exports = config;
