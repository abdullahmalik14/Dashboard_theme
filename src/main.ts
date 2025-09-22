import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

createApp(App)
  .use(router) // ✅ yeh hona chahiye
  .mount('#app')
