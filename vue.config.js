module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '../' : '/',
  pages: {
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
    proxy: {
      '/TouchStoneService': {
        target: 'http://114.215.186.35:8090',
        changeOrigin: true,
        wx: true
      }
    }
  }
}
