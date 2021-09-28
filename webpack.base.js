/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { buildPath, sourcePath } = require('./webpack.paths')
const rules = require('./webpack.rules')


module.exports = {
  context: sourcePath,
  entry: {
    bundle: path.resolve(sourcePath, 'index.tsx')
  },
  mode: 'development',
  module: { rules },
  output: {
    filename: '[name].js',
    path: buildPath,
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity, // ??
      minSize: 0,
      hidePathInfo: true,
      cacheGroups: {
        engine: {
          test: /[\\/]node_modules[\\/]babylon.*/,
          name: 'engine',
          chunks: 'all',
          enforce: true,
          priority: -5,
          reuseExistingChunk: true
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
          priority: -10,
          reuseExistingChunk: true
        },
        shared: {
          chunks: 'all',
          priority: -20,
          minChunks: 2,
          name: 'shared'
        }
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss']
  }
}
