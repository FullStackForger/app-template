/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { staticPath } = require('./webpack.paths')

const rules = []

rules.push({
  test: /\.node$/,
  use: 'node-loader'
})

rules.push({
  test: /\.mjs$/,
  include: /node_modules/,
  type: 'javascript/auto'
})

rules.push({
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  loader: 'babel-loader'
})

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { modules: false, sourceMap: true } }]
})

rules.push({
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'images/ui/[name].[ext]'
      }
    }
  ]
})

rules.push({
  test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url-loader'
})

rules.push({
  // todo: consider adding postcss loader with autoprefixer module
  test: /\.scss$/,
  // include: /src/,
  oneOf: [
    {
      resourceQuery: /^\?global$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/'
          }
        },
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            // additionalData: `@import '${staticPath}/scss/main.scss';`,
            sassOptions: {
              includePaths: [path.resolve(staticPath, 'scss/')]
            }
          }
        }
      ]
    },
    {
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/'
          }
        },
        {
          loader: 'css-loader',
          options: { modules: true, sourceMap: true }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            // additionalData: `@import '${staticPath}/scss/main.scss';`
          }
        }
      ]
    }
  ]
})

module.exports = rules
