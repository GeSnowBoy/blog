var path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cdnExternals = require('./cdn.externals.js');
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
// let BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
// .BundleAnalyzerPlugin;
function resolve(src) {
  return path.resolve(__dirname, '../', src);
}
let temp = cdnExternals([
  'react',
  'react-dom',
  'react-router-dom',
  'axios',
  'moment',
  'antd',
  'highlight.js',
  'marked',
  'redux',
  'react-redux'
]);

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    app: resolve('src/index.tsx')
  },
  devtool: 'none',
  output: {
    path: resolve('dist'),
    libraryTarget: 'umd',
    filename: '[name].min.js',
    publicPath: './'
  },

  externals: temp.externals,

  module: {
    rules: []
  },

  plugins: [
    new htmlWebpackPlugin({
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.ico'),
      filename: `index.html`,
      inject: true,
      files: temp.files,
      excludeChunks: ['build']
    })
    // new BundleAnalyzerPlugin()
  ]
});
