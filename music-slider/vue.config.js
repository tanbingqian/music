// vue.config.js
module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          'assets': '@/assets',
          'components': '@/components',
          'views': '@/views',
        }
      }
    },
  }