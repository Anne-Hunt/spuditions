<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import CommentCard from "../components/CommentCard.vue";
import Pop from "../utils/Pop.js";
import { profileService } from "../services/ProfileService.js";
import { useRoute } from "vue-router";

const route = useRoute()

const profile = computed(() => AppState.activeProfile)

async function getProfile(){
  try {
    await profileService.getProfile(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get profile", 'error')
    console.error(error)
  }
}

onMounted(() => {
  getProfile()
})

</script>


<template>
  <div v-if="profile" class="row me-0 align-items-center">
    <div class="col-12 text-center p-4">
      <h3 class="fw-bold text-white">{{ profile.name }}</h3>
    </div>
    <!-- //!SECTION - Clickable reputation potatoes -->
    <div class="col-12 text-center">
      <img class="profile-img" :src="profile.picture" alt="">
    </div>
    <div class="col-12 d-flex justify-content-center align-items-center pt-4">
      <img class="rotten-spud-img px-4 pb-2 selectable" src="/src/assets/img/rottenSpud.png" alt="">
      <h5 class="text-white">8</h5>
      <img class="spud-img px-4 selectable" src="/src/assets/img/spuditions.png" alt="">
    </div>
  </div>

  <!-- //!SECTION - Thread & Reply container -->
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-6 rounded bg-lightGreen p-3">
        <div class="row">
          <div class="col-12 col-md-6 inner-border">
            <h4 class="text-white rounded bg-forestGreen text-center p-2">Threads Created:</h4>
            <!-- //FIXME - Add number of threads -->
            <h1 class="text-white text-center">#</h1>
          </div>
          <div class="col-12 col-md-6">
            <h4 class="text-white rounded bg-forestGreen text-center p-2">Replies Created:</h4>
            <!-- //FIXME - Add number of replies -->
            <h1 class="text-white text-center">#</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-6 rounded bg-lightGreen p-3">
        <h4 class="text-white rounded bg-forestGreen text-center p-2">You have visited {12} Idaho State Parks!</h4>
      </div>
    </div>
  </div>

  <div class="bottom-border"></div>

  <h1 class="text-white text-center my-5">Threads:</h1>

  <!-- //FIXME - v-for over comments -->
  <div class="row me-0 justify-content-center">
    <CommentCard/>
  </div>
    
</template>


<style lang="scss" scoped>
.profile-img{
  height: 150px;
  width: fit-content;
  aspect-ratio: 1/1;
  border-radius: 50em;
  object-fit: cover;
  object-position: center
}

.rotten-spud-img{
  height: 64px;
  width: fit-content;
  object-fit: cover;
  object-position: center;
}

.spud-img{
  height: 50px;
  width: fit-content;
  object-fit: cover;
  object-position: center;
}

.inner-border{
  border-right: 2px solid white;
}

.bottom-border{
  margin-top: 60px;
  margin-right: 30px;
  margin-left: 30px;
  border-bottom: 4px solid white;
}
</style>