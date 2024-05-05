<script setup>
import { ref } from 'vue';
import { reviewService } from '../services/ReviewService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';


const reviewData = ref({
    body: '',
    rating: 0
})


async function createReview(){
    try {
        await reviewService.createReview(reviewData)
        reviewData.value = {body: '', rating: 0}
    } catch (error) {
        logger.error("Unable to review at this time", error)
        Pop.toast("Unable to review at this time", 'error')
    }
}
</script>


<template>
<div class="p-3">
    <form @submit.prevent="createReview()">
    <div class="mb-3">
        <label for="body">Your review</label>
        <input type="textarea" v-model="reviewData.body" name="reviewBody" id="body">
    </div>
    <div class="mb-3">
        <label for="rating">Rating</label>
        <input type="number" required default="5" v-model="reviewData.rating">
    </div>
    <button class="btn btn-primary" type="submit">SUBMIT</button>
    </form>
</div>
</template>


<style lang="scss" scoped>

</style>