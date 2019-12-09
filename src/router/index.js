import Vue from 'vue'
import VueRouter from 'vue-router'
import MeetingsPage from '../views/MeetingsPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MeetingsPage',
    component: MeetingsPage
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: () => import(/* webpackChunkName: "users" */ '../views/UsersPage.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
