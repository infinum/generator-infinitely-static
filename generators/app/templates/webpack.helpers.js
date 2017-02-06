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
  },
  resolveFileName(filePath) {
    const fileName = filePath.slice(0, -1);

    return fileName.length
      ? `${fileName}/index.html`
      : 'index.html';
  },

  resolveTemplate(fileName) {
    return `app/pages/${fileName}.hbs`;
  }
};
