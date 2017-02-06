const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  generateStyleLoader() {
    const base = {
      test: /\.(css|scss)$/,
      use: [{
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader'
      }, {
        loader: 'sass-loader'
      }]
    };

    return {
      test: base.test,
      use: DEV
        ? [{loader: 'style-loader'}, ...base.use]
        : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: base.use
        })
    };
  }
};
