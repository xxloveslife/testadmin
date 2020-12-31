import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import '@/style/index.scss'   //global css
import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible'
import cookies from 'vue-cookies'


Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.prototype.$cookies = cookies;




/**
 * [Global 全局参数方法]
 */
var Global = {
  database: {}, // 用户信息

  roomsets: function (id, name) {
    Global.database.roomId = id
    Global.database.roomName = name
  },

  urlsets: null // 连接跳转方法
}

// 请求教室信息
if (window.client !== undefined && window.client.GetClassInfo !== undefined) {
  window.client.GetClassInfo()
} else {

  Global.roomsets(null, null)
}
Vue.prototype.Global = Global;




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
