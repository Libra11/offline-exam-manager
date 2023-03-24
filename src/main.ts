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
