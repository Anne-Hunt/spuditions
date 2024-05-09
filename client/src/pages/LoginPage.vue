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
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-7 col-11">
                <form class="mt-5 px-5" @submit.prevent="handleLogin()">
                    <h1 class="text-center mb-3">Login</h1>

                    <label>Email</label>
                    <input v-model="formData.email" type="email" class="form-control mb-3" required>

                    <label>Password</label>
                    <input v-model="formData.password" type="password" class="form-control mb-3" required>

                    <div class="text-center">
                        <button class="btn px-5 btn-forestGreen">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>


<style lang="scss" scoped>

</style>