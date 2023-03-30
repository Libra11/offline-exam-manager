/*
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-03-30 18:47:55
 * @LastEditors: Libra
 * @Description: 入口文件
 */
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/el-message.css'
import '@/assets/style/index.css'

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
