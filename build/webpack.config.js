var path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cdnExternals = require('./cdn.externals.js');
function resolve(src) {
  return path.resolve(__dirname, '../', src);
}
module.exports = function(env) {
  let isDev = !!env.development;
  let temp = cdnExternals([
    'react',
    'react-dom',
    'react-router-dom',
    'axios',
    'moment',
    'antd'
  ]);

  return {
    mode: isDev ? 'development' : 'production',
    entry: {
      app: resolve('public/index.tsx'),
      build: resolve('src/index.tsx')
    },
    devtool: isDev ? 'inline-source-map' : 'none',
    output: {
      path: resolve('dist'),
      libraryTarget: 'umd',
      filename: isDev ? '[name].[chunkhash].min.js' : '[name].min.js',
      publicPath: isDev ? '' : './'
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
    resolve: {
      extensions: ['.tsx', '.jsx', '.js', '.ts', '.json'],
      alias: {},
      modules: [resolve('node_modules'), resolve('src')]
    },
    externals: isDev ? {} : temp.externals,

    module: {
      rules: [
        {
          test: /.[tj]s(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader' // creates style nodes from JS strings
            },
            {
              loader: 'css-loader' // translates CSS into CommonJS
            },
            {
              loader: 'less-loader' // compiles Less to CSS
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader'
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader'
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader'
        }
      ]
    },

    plugins: [
      new htmlWebpackPlugin({
        template: resolve('public/index.html'),
        filename: `index.html`,
        inject: true,
        files: isDev ? { css: [], js: [] } : temp.files
      })
    ]
  };
};
