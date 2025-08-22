import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router/index.js'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
