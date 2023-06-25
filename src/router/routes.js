const Home = () => import('@/pages/Home.vue')
const Authentication = () => import('@/pages/Authentication.vue')

export default [
    {
        path: '/',
        redirect: { name: 'Home' }
    },

    {
        path: '/home',
        name: 'Home',
        component: Home
    },

    {
        path: '/login',
        name: 'Authentication',
        component: Authentication
    }
]