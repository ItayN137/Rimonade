import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from '../components/loginscreen/loginscreen.vue';
import WelcomeScreen from '../components/welcomescreen/welcomescreen.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: LoginScreen,
            props: {
                validUsername: 'Itay',
                validPassword: '1234'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: WelcomeScreen
        }
    ]
});
export default router;
