import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/css/global.css'
import './assets/css/icon.css'
import './assets/css/color.css'
import './plugins/clipboard.js'
import { Loading, Message } from 'element-ui'

let loading
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8081/api'
// axios请求拦截器
axios.interceptors.request.use(config => {
  loading = Loading.service({
    lock: true,
    text: 'loading...'
  })
  // config.headers.authorization = window.sessionStorage.getItem('token')
  return config
})
// axios响应拦截器
axios.interceptors.response.use(response => {
  // 关闭加载组件
  loading.close()
  return response
}, err => {
  // 消息提示
  Message({
    message: err,
    type: 'error',
    showClose: true,
    duration: 0
  })
  // 手动关闭实例
  Message.close()
  return Promise.reject(err)
})

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
