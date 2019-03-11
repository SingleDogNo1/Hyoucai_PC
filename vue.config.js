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
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/TouchStone': {
        target: 'http://opsstatic.dpandora.cn:30174', // SIT
        // target: 'http://opsstatic.dpandora.cn:30162', // UAT
        changeOrigin: true,
        wx: true
      }
    }
  }
}
