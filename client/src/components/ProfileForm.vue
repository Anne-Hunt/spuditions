<script setup>
import { computed, ref } from 'vue';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

const user = computed(()=> AppState.account)

const profileData = ref({
    email: '',
    name: '',
    picture: ''
})

async function updateProfile(){
    try {
        const profile = profileData.value
        await accountService.updateAccount(profile)
        profileData.value = {
            email: '',
            name: '',
            picture: ''
            }
    } catch (error) {
        logger.error("Unable to update Profile", error)
        Pop.toast("Unable to update at this time", 'error')
    }
}
</script>


<template>
<div class="p-3">
    <form @submit.prevent="updateProfile()">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" :default="user.name" v-model="profileData.name">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control" :default="user.email" v-model="profileData.email">
        </div>
        <div class="mb-3">
            <label for="picture" class="form-label">Picture</label>
            <input type="text" class="form-control" :default="user.picture" v-model="profileData.picture">
        </div>
        <button class="btn btn-primary text-light">SUBMIT</button>
    </form>
</div>
</template>


<style lang="scss" scoped>

</style>