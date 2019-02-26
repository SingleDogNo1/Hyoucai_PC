const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const env = process.env.NODE_ENV

module.exports = {
  baseUrl: env === 'production' ? './' : '/',
  pages: {
    app: {
      entry: 'src/entries/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '汇有财',
      chunks: ['chunk-vendors', 'chunk-common', 'app']
    },
    hyc: {
      entry: 'src/entries/hyc.js',
      template: 'public/index.html',
      filename: 'hyc/index.html',
      title: '汇有财',
      chunks: ['chunk-vendors', 'chunk-common', 'hyc']
    },
    djs: {
      entry: 'src/entries/djs.js',
      template: 'public/index.html',
      filename: 'djs/index.html',
      title: '汇有财',
      chunks: ['chunk-vendors', 'chunk-common', 'djs']
    }
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/TouchStone': {
        target: 'http://opsstatic.dpandora.cn:30174/',
        changeOrigin: true,
        wx: true
      },
      '/TouchStoneService': {
        target: 'http://opsstatic.dpandora.cn:30174//d',
        changeOrigin: true,
        wx: true
      },
      '/TouchStoneServiceNew': {
        target: 'http://opsstatic.dpandora.cn:30174//h',
        changeOrigin: true,
        wx: true
      }
    }
  },
  configureWebpack: config => {
    if (env === 'production') {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true, // console
              drop_console: true,
              // pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
  }
}
