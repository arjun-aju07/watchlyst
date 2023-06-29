<template>
    <div class="auth-container">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'Authentication'
    }
</script>

<style scoped>
    .auth-container {
        width: 300px;
        margin: 0 auto;
    }
</style>