/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const { rootPath, staticPath, sourcePath } = require('./webpack.paths')
const config = require('./webpack.base')

module.exports = {
  ...config,
  stats: 'normal',
  devServer: {
    hot: true,
    open: false,
    port: 9000,
    historyApiFallback: true,
    static: {
      directory: path.join(staticPath, 'public'),
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9100',
        secure: false,
        changeOrigin: true,
        // pathRewrite: { '^/api': '' },
      },
    },
    headers: {
      'Access-Control-Allow-Origin': 'localhost:*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  watchOptions: {
    ignored: ['**/build/**', '**/dist/**', '**/node_modules/**', '**/src/server/**', '**/src/data/**']
  },
  devtool: 'cheap-module-source-map',
  entry: {
    bundle: [config.entry.bundle]
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,

              plugins: [
                // ['@babel/plugin-proposal-decorators', { legacy: true }],
                '@babel/plugin-proposal-class-properties', // @see: https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
                '@babel/plugin-proposal-optional-chaining',
                'react-hot-loader/babel'
              ],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: true,
                    targets: {
                      chrome: 66,
                      firefox: 60,
                      node: 'current'
                    }
                  }
                ],
                '@babel/preset-typescript',
                ['@babel/preset-react', {
                  'runtime': 'automatic'
                }]
              ]
            }
          }
        ]
      },
      ...config.module.rules
    ]
  },
  plugins: [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(rootPath, './tsconfig.json')
      }
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(`${sourcePath}/static/template/index.html`)
    })
  ],
  resolve: {
    ...config.resolve,
    alias: { 'react-dom': '@hot-loader/react-dom' }
  }
}
