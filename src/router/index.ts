import {
  createRouter,
  createWebHistory
} from 'vue-router'

import LoginScreen from '../components/screens/loginscreen.vue'
import WelcomeScreen from '../components/screens/welcomescreen.vue'
import EvacuationScreen from '../components/screens/evacuationscreen.vue'


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


export default router
