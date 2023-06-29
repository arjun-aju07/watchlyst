<template>
    <h2 class="title">
        Login
    </h2>

    <form class="box" @submit.prevent>
        <div class="field">
            <label class="label">Email</label>

            <div class="control">
                <input v-model="email" class="input" type="email" placeholder="e.g. abc@example.com">
            </div>
        </div>

        <div class="field">
            <label class="label">Password</label>

            <div class="control">
                <input v-model="password" class="input" type="password" placeholder="********">
            </div>
        </div>

        <button class="button is-primary" @click="loginUser">Sign in</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue'

    import { useRouter } from 'vue-router'

    import { getAuth, signInWithEmailAndPassword } from '@/firebase'

    const router = useRouter()

    const email = ref('')
    const password = ref('')

    function loginUser () {
        signInWithEmailAndPassword(getAuth(), email.value, password.value)
            .then((data) => {
                router.push({ name: 'Home' })
            })
            .catch((error) => {
                console.log(error)
            })
    }
</script>