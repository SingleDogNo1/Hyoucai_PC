module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
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
        target: 'http://47.100.38.237:8888',
        changeOrigin: true,
        wx: true
      },
      '/TouchStoneService': {
        target: 'http://47.100.38.237:8088/d',
        changeOrigin: true,
        wx: true
      },
      '/TouchStoneServiceNew': {
        target: 'http://47.100.38.237:8088/h',
        changeOrigin: true,
        wx: true
      }
    }
  }
}
