const DEV = process.env.NODE_ENV !== 'production';

const plugins = [
  require('autoprefixer')({})
];

if (!DEV) {
  plugins.push(require('cssnano')({}));
}

module.exports = {plugins};
