module.exports = (env, argv) => {
  var webpackConfig = argv.mode === 'development'
  ? require('./webpack.dev.conf')
  : require('./webpack.prod.conf')
  return webpackConfig;
};