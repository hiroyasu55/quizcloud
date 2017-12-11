const webpack = require('webpack')
const prodWebpackConfig = require('./webpack.prod.conf')

module.exports = Object.assign({}, prodWebpackConfig, {
  target: 'node',
  devtool: false,
  entry: './src/server-entry.js',
  output: Object.assign({}, prodWebpackConfig.output, {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  }),
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    })
  ]
})
