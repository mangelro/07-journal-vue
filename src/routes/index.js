import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import dayBookRouter from '../modules/daybook/router'

const routes = [
  {
    path: '/',
    redirect: { name: 'home' },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path:'/daybook',
    ...dayBookRouter
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router