var path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
function resolve(src) {
  return path.resolve(__dirname, '../', src);
}
module.exports = merge(baseWebpackConfig, {
  entry: {
    app: resolve('src/index.tsx')
  },
  output: {
    path: resolve('dist'),
    libraryTarget: 'umd',
    filename: '[name].[chunkhash].min.js',
    publicPath: ''
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    disableHostCheck: true,
    proxy: {
      '/proxy': {
        target: 'https://oc.zaps.curio.im/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': ''
        }
      }
    }
  },

  externals: {},

  plugins: [
    new htmlWebpackPlugin({
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.ico'),
      filename: `index.html`,
      inject: true,
      files: { css: [], js: [] }
    })
  ]
});
