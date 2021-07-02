import { createRouter, createWebHistory } from 'vue-router'
import {nextTick} from "vue";

const routes = [
  {
    path: '/',
    name: 'FraudManager',
    component: () => import('../views/FraudManager')
  },{
    path: '/drops',
    name: 'Drops',
    component: () => import('../views/Drops'),
  },{
    path: '/affilates',
    name: 'Affilates',
    component: () => import('../views/Affilates')
  },{
    path: '/workers',
    name: 'Workers',
    component: () => import('../views/Workers')
  },{
    path: '/finance',
    name: 'Finance',
    component: () => import('../views/Finance')
  },{
    path: '/keitaro',
    name: 'Keitaro',
    component: () => import('../views/Finance')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  $('.ui.dimmer.modals.page.transition').remove()
  next()
})

export default router
