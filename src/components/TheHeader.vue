<template>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">
                <img src="@/assets/akatsuki-logo.png">
            </div>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="headerNavbar">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="headerNavbar" class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/home" class="navbar-item">
                    Home
                </router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item" v-if="!isLoggedIn">
                    <div class="buttons">
                        <router-link to="/register" class="button is-primary">
                            <strong>Sign up</strong>
                        </router-link>

                        <router-link to="/login" class="button is-light">
                            Log in
                        </router-link>
                    </div>
                </div>

                <div class="navbar-item" v-if="isLoggedIn">
                    <div class="buttons">
                        <button class="button is-light" @click="logout">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { onMounted, ref } from 'vue'

    import { useRouter } from 'vue-router'

    import { getAuth, onAuthStateChanged, signOut } from '@/firebase'

    const router = useRouter()

    const isLoggedIn = ref(false)

    onMounted(() => {
        onAuthStateChanged(getAuth(), (user) => {
            isLoggedIn.value = !!user
        })
    })

    function logout () {
        signOut(getAuth())
            .then(() => {
                router.push({ name: 'Login' })
            })
    }
</script>