// function kbs(n) {
//   return 1024 * n
// }

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '../' : '/',
  productionSourceMap: false,
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
  configureWebpack: config => {
    if (process.env.VUE_APP_RUNTIME_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  // chainWebpack: config => {
  //   if (process.env.VUE_APP_RUNTIME_ENV === 'production') {
  //     const imagesRule = config.module.rule('images')
  //     imagesRule.uses.clear()
  //     imagesRule
  //       .use('url-loader')
  //       .loader('url-loader')
  //       .options({
  //         limit: kbs(4),
  //         fallback: {
  //           loader: 'file-loader',
  //           options: {
  //             name: 'img/[name].[hash:8].[ext]'
  //           }
  //         }
  //       })
  //     imagesRule
  //       .use('image-webpack-loader')
  //       .loader('image-webpack-loader')
  //       .options({ bypassOnDebug: true })
  //   }
  // },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/TouchStone': {
        // target: 'http://opsstatic.dpandora.cn:30174', // SIT
        target: 'http://opsstatic.dpandora.cn:30162', // UAT
        changeOrigin: true,
        wx: true
      }
    }
  }
}
