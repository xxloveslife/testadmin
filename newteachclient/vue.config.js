
module.exports = {
  //     // [process.env.VUE_APP_BASE_API]: {
  //     //   target: process.env.VUE_APP_BASE_API,   //配置地址
  //     //   ws: true,
  //     //   changeOrigin: true,
  //     //   pathRewrite: {
  //     //     ['^' + process.env.VUE_APP_BASE_API]: ''
  //     //   }
  //     // }
  //   }
  // }
  devServer: {
    // open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8080',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://test.laoshi.yishenhang.com', //API服务器的地址
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  }
}