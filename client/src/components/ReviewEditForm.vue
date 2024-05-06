<script setup>
import { ref } from 'vue';
// import { reviewService } from '../services/VisitedService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';


const reviewData = ref({
    body: '',
    userRating: 0
})


// async function editReview(){
//     try {
//         await reviewService.editReview(reviewData)
//         reviewData.value = {body: '', userRating: 0}
//     } catch (error) {
//         logger.error("Unable to edit review at this time", error)
//         Pop.toast("Unable to edit review at this time", 'error')
//     }
// }
</script>


<template>
<div class="p-3">
    <!-- <form @submit.prevent="editReview()"> -->
    <div class="mb-3">
        <label for="body">Your review</label>
        <input type="textarea" v-model="reviewData.body" name="reviewBody" id="body">
    </div>
    <div class="mb-3">
        <label for="rating">Rating</label>
        <input type="number" required default="5" v-model="reviewData.userRating">
    </div>
    <button class="btn btn-primary" type="submit">SUBMIT</button>
    <!-- </form> -->
</div>
</template>


<style lang="scss" scoped>

</style>