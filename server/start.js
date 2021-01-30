require('babel-polyfill');

require('@babel/register')({
  presets: ['@babel/preset-env'],
});

require('@babel/core').transform('code', {
  plugins: ['@babel/plugin-transform-async-to-generator'],
});

module.exports = {
  entry: ['@babel/polyfill', require('./src/index.js')],
};
