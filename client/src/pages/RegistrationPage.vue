<script setup>
import { ref } from 'vue';
import { authService } from '../services/AuthService.js';
import { router } from '../router.js';
import Pop from '../utils/Pop.js';


const formData = ref({
    email: '',
    password: '',
    name: ''
})

async function handleRegister() {
    try {
        await authService.register(formData.value)
        router.push({ name: 'Home'})
    }
    catch (error){
        Pop.error(error);
    }
}

</script>


<template>
    <form class="mt-5 px-5" @submit.prevent="handleRegister()">
        <label>Name</label>
        <input v-model="formData.name" type="text" class="form-control mb-3">

        <label>Email</label>
        <input v-model="formData.email" type="email" class="form-control mb-3">

        <label>Password</label>
        <input v-model="formData.password" type="password" class="form-control mb-3">

        <button class="btn px-5 btn-primary">Register</button>
    </form>
</template>


<style lang="scss" scoped>

</style>