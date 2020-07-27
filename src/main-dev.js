import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/css/global.css'
import './assets/css/github-markdown.css'
import './assets/css/icon.css'
import 'element-ui/lib/theme-chalk/display.css'
import './plugins/element.js'
import './plugins/clipboard.js'
import { Loading } from 'element-ui'

let loading
// 配置请求的根路径
axios.defaults.baseURL = 'http://192.168.1.106:8081/api'
// axios请求拦截器
axios.interceptors.request.use(config => {
  loading = Loading.service({
    lock: true,
    text: 'loading...'
  })
  config.headers.authorization = window.sessionStorage.getItem('token')
  return config
})
// axios响应拦截器
axios.interceptors.response.use(config => {
  loading.close()
  return config
})

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
