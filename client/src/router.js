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
    path: '/about-us',
    name: 'About Us',
    component: loadPage('AboutUsPage')
  },
  {
    path: '/search/:query',
    name: 'Search Page',
    component: loadPage('SearchPage')
  },
  {
    path: '/forums/general',
    name: 'General Chat Forum',
    component: loadPage('GeneralChatForum')
  },
  {
    path: '/parksList',
    name: 'Parks List',
    component: loadPage('ParksList')
  },
  {
    path: '/forums/parks',
    name: 'Parks Forum',
    component: loadPage('ParksForum')
  },
  {
    path: '/forums/groups',
    name: 'Groups Forum',
    component: loadPage('GroupsForum')
  },
  {
    path: '/forums/equipment',
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
    path: '/register',
    name: 'Register',
    component: loadPage('RegistrationPage')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: loadPage('ProfilePage')
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
