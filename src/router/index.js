import { createRouter, createWebHistory } from 'vue-router'

import { getAuth, onAuthStateChanged } from '@/firebase'

import routes from '@/router/routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})

function getCurrentUser () {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener()
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async (to, from) => {
    if (to.matched.some((page) => page.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            return true
        } else {
            console.log('no access')
            return { name: 'Login' }
        }
    }
})

export default router
