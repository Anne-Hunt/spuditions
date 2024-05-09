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
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-7 col-11">
                <form class="mt-5 px-5" @submit.prevent="handleRegister()">
                    <h1 class="text-center mb-3">Register</h1>

                    <label>Name</label>
                    <input v-model="formData.name" type="text" class="form-control mb-3" required>

                    <label>Email</label>
                    <input v-model="formData.email" type="email" class="form-control mb-3" required>

                    <label>Password</label>
                    <input v-model="formData.password" type="password" class="form-control mb-3" required>

                    <div class="text-center">
                        <button class="btn px-5 btn-forestGreen">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <form class="mt-5 px-5" @submit.prevent="handleRegister()">

    </form>
</template>


<style lang="scss" scoped>

</style>