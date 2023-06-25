<template>
    <div>
        <header class="block">
            <TheHeader />
        </header>

        <main class="container is-fluid">
            <router-view />
        </main>
    </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'

export default {
    name: 'app',

    components : {
        TheHeader
    }
}
</script>
