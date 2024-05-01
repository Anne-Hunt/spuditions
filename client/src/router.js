import { createRouter, createWebHashHistory } from 'vue-router'
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
  history: createWebHashHistory(),
  routes
})
