// module.exports = {
//   devServer: {
//     // open: true, //是否自动弹出浏览器页面
//     host: "localhost",
//     port: '8080',
//     https: false,
//     hotOnly: false,
//     proxy: {
//       '/api': {
//         target: 'https://www.baidu.com/', //API服务器的地址
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     },
//   }
// }

module.exports = {
  productionSourceMap: false,
  lintOnSave: false, // 关闭eslint
  // baseUrl: '/',
  // publicPath: './',
  assetsDir: 'static/teather',
  indexPath: 'newindex.htm',
  outputDir: 'dist',
  devServer: {
    // host: 'www.yshtest.com',
    // port: 8080,
    proxy: {
      "/api": {
        target: "http://test.laoshi.yishenhang.com/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
}