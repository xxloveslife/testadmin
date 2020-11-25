
module.exports = {
  devServer: {
    host: 'localhost',
    port: '8080',
    proxy: {

      // www.baidu.com/post    =>     localhost:8080/api/post
      // '/api': {
      //   target: process.env.VUE_APP_BASE_API,   //配置地址
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // }

      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_API,   //配置地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
}