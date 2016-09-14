'use strict';
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = process.env.PORT ? process.env.PORT : <%= opt.port %>;

new WebpackDevServer(webpack(config), Object.assign({
  contentBase: path.join(__dirname, '../build'),
  hot: true,
  inline: true,
  progress: true,
  compress: true,
  stats: {
    colors: true,
    hash: true,
    timings: true,
    chunks: false
  },
  historyApiFallback: true
}))
.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(`An error occured: ${err}`); // eslint-disable-line no-console
  }

  console.log(`Webpack dev server is listening at http://localhost:${port}. <Ctrl> + click on the URL to open.`); // eslint-disable-line no-console
});
