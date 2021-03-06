import axios from 'axios'
import Qs from 'qs' //请求接口序列化使用
import store from '@/store'
import router from '@/router'
import Vue from 'vue'
import { Loading, Message } from 'element-ui' // 引用element-ui的加载和消息提示组件

const $axios = axios.create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  // baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: '/api/V2',
  baseURL: process.env.VUE_APP_BASE_API,

  // headers: { "Content-Type": "multipart/form-data" },
})
Vue.prototype.$http = axios.create({
  baseURL: '/api/V2',
  timeout: 50000,
  headers: { 'Content-Type': 'multipart/form-data' },
}) // 并发请求

Vue.prototype.$http.interceptors.request.use(
  (config) => {
    // loading = Loading.service({ text: '拼命加载中' })
    const token = store.getters.token
    if (token) {
      // config.headers.Authorization = token // 请求头部添加token
      config.headers.SID = token // 请求头部添加token
      // headers: {'Content-Type': 'multipart/form-data'}
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Vue.prototype.$http.interceptors.response.use(
  (response) => {
    // if (loading) {
    //   loading.close()
    // }
    const code = response.status
    if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
    // console.log('response', response)
    // return Promise.resolve(response.data)
  },
  (error) => {
    // if (loading) {
    //   loading.close()
    // }
    console.log(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回401 清除token信息并跳转到登陆页面
          store.commit('DEL_TOKEN')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath,
            },
          })
          break
        case 404:
          Message.error('网络请求不存在')
          break
        default:
          Message.error(error.response.data.message)
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        Message.error('请求超时！请检查网络是否正常')
      } else {
        Message.error('请求失败，请检查网络是否已连接')
      }
    }
    return Promise.reject(error)
  }
)

// 在全局请求和响应拦截器中添加请求状态
// let loading = null

// 请求拦截器
$axios.interceptors.request.use(
  (config) => {
    // loading = Loading.service({ text: '拼命加载中' })
    const token = store.getters.token
    if (token) {
      // config.headers.Authorization = token // 请求头部添加token
      config.headers.SID = token // 请求头部添加token
      // headers: {'Content-Type': 'multipart/form-data'}
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
$axios.interceptors.response.use(
  (response) => {
    // if (loading) {
    //   loading.close()
    // }
    const code = response.status
    if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
    // console.log('response', response)
    // return Promise.resolve(response.data)
  },
  (error) => {
    // if (loading) {
    //   loading.close()
    // }
    console.log(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回401 清除token信息并跳转到登陆页面
          store.commit('DEL_TOKEN')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath,
            },
          })
          break
        case 404:
          Message.error('网络请求不存在')
          break
        default:
          Message.error(error.response.data.message)
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        Message.error('请求超时！请检查网络是否正常')
      } else {
        Message.error('请求失败，请检查网络是否已连接')
      }
    }
    return Promise.reject(error)
  }
)

// get，post请求方法
export default {
  post(url, data) {
    return $axios({
      method: 'post',
      url,
      data: Qs.stringify(data),
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      // }
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
    })
  },
  get(url, params) {
    return $axios({
      method: 'get',
      url,
      params,
    })
  },
}
