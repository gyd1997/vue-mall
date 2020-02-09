module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  devServer: {
    host: '192.168.1.111',
    port: '8080',
    https: false,
    open: true,
    proxy: null
  }
}

// const path = require('path')
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

// module.exports = {
//   chainWebpack: (config) => {
//     config.resolve.alias
//       .set('@', resolve('src'))
//       .set('components', resolve('src/components'))
//       .set('assets', resolve('src/assets'))
//       .set('common', resolve('src/common'))
//       .set('network', resolve('src/network'))
//       .set('views', resolve('src/views'))
//   }
// }
