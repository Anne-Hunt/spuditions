<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { authService } from '../services/AuthService';
import { router } from '../router.js';

const formData = ref({
    email: '',
    password: ''
})

async function handleLogin() {
    try {
        await authService.login(formData.value)
        router.push({ name: 'Home'})
    }
    catch (error){
        Pop.error(error);
    }
}

</script>


<template>
    <form class="mt-5" @submit.prevent="handleLogin()">
        <label>Email</label>
        <input v-model="formData.email" type="email" class="form-control mb-3">

        <label>Password</label>
        <input v-model="formData.password" type="password" class="form-control mb-3">

        <button class="btn px-5 btn-primary">Login</button>
    </form>
</template>


<style lang="scss" scoped>

</style>