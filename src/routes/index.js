import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import dayBookRouter from '../modules/daybook/router'
import authRouter from '../modules/auth/router'
import isAuthenticatedGuard from '../modules/auth/router/auth-guard'

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
    beforeEnter:[isAuthenticatedGuard],
    ...dayBookRouter
  },
  {
    path:'/auth',
    ...authRouter
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router