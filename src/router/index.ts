import {
  createRouter,
  createWebHistory
} from 'vue-router'

import LoginScreen from '../components/screens/loginscreen.vue'
import WelcomeScreen from '../components/screens/welcomescreen.vue'
import EvacuationScreen from '../components/screens/evacuationscreen.vue'
import { isLoggedIn } from '../auth/auth'


const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginScreen
    },

    {
      path: '/home',
      name: 'home',
      component: WelcomeScreen
    },

    {
      path: '/evacuation',
      name: 'evacuation',
      component: EvacuationScreen
    }
  ]
})

router.beforeEach((to) => {
  if (!isLoggedIn.value && to.path !== '/') {
    return '/'
  }

  if (isLoggedIn.value && to.path === '/') {
    return '/home'
  }
})


export default router
