const Home = () => import('@/pages/Home.vue')
const Authentication = () => import('@/pages/Authentication.vue')

const Login = () => import('@/components/Login.vue')
const Register = () => import('@/components/Register.vue')

export default [
    {
        path: '/',
        redirect: { name: 'Home' }
    },

    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/auth',
        name: 'Authentication',
        component: Authentication,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },

            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]
    }
]