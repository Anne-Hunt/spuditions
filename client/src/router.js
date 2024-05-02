import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { authHandler } from './handlers/AuthHandler'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/aboutUs',
    name: 'About Us',
    component: loadPage('AboutUsPage')
  },
  {
    path: '/search',
    name: 'Search Page',
    component: loadPage('SearchPage')
  },
  {
    path: '/forums',
    name: 'General Chat Forum',
    component: loadPage('GeneralChatForum')
  },
  {
    path: '/parksforum',
    name: 'Parks Forum',
    component: loadPage('ParksForum')
  },
  {
    path: '/groupsForum',
    name: 'Groups Forum',
    component: loadPage('GroupsForum')
  },
  {
    path: '/equipmentforum',
    name: 'Equipment Forum',
    component: loadPage('EquipmentForum')
  },
  {
    path: '/parks/:parkId',
    name: 'Park Details',
    component: loadPage('ParkDetailsPage')
  },
  {
    path: '/login',
    name: 'Login',
    component: loadPage('LoginPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authHandler.authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHistory(),
  routes
})
