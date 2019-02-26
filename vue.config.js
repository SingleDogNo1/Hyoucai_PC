//去console插件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// //gzip压缩插件
// const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '../' : '/',
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
        target: 'http://opsstatic.dpandora.cn:30174',
        changeOrigin: true,
        wx: true
      },
      '/TouchStoneService': {
        target: 'http://opsstatic.dpandora.cn:30174/d',
        changeOrigin: true,
        wx: true
      },
      '/TouchStoneServiceNew': {
        target: 'http://opsstatic.dpandora.cn:30174/h',
        changeOrigin: true,
        wx: true
      }
    }
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'none' : 'source-map'
    // plugins: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       compress: {
    //         warnings: false,
    //         drop_debugger: true,
    //         drop_console: true,
    //       },
    //     },
    //     sourceMap: false,
    //     parallel: true,
    //   }),
    //   new CompressionWebpackPlugin({
    //     filename: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: new RegExp(
    //       '\\.(' +
    //       ['js', 'css'].join('|') +
    //       ')$',
    //     ),
    //     threshold: 10240,
    //     minRatio: 0.8,
    //   })
    // ]
  },
  chainWebpack: config => {
    config.plugin('uglify').tap(([args]) => {
      return [
        Object.assign(args, {
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      ]
    })
  }
}
