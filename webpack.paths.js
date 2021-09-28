/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const rootPath = __dirname
const buildPath = path.resolve(rootPath, 'main')
const sourcePath = path.resolve(rootPath, 'src/client')
const staticPath = path.resolve(sourcePath, 'static')

const paths = {
  rootPath,
  buildPath,
  sourcePath,
  staticPath
}

module.exports = paths
