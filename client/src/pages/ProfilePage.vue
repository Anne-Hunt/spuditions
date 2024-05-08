<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import CommentCard from "../components/CommentCard.vue";
import Pop from "../utils/Pop.js";
import { profileService } from "../services/ProfileService.js";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";

const route = useRoute()

const profile = computed(() => AppState.activeProfile)
const user = computed(()=> AppState.account)
const reviewedAlready = computed(()=> AppState.reputation.find(reputation => reputation.creatorId == user.value.id))

async function getProfile(){
  try {
    await profileService.getProfile(route.params.profileId)
    await profileService.getReputation(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get profile", 'error')
    logger.error(error)
  }
}

onMounted(() => {
  getProfile()
})

</script>

<template>
  <div v-if="profile" class="container-fluid">
    <div class="row me-0 align-items-center bg-forestGreen">
      <div class="col-12 text-center p-3 pt-5">
        <h3 class="fw-bold text-white">{{ profile.name }}</h3>
      </div>
      <div class="col-12 text-center">
        <img class="profile-img" :src="profile.picture" alt="">
      </div>
      <div class="col-12 text-center text-white pt-4 fs-4">
        Reputation
      </div>
      <div class="col-12 d-flex justify-content-center align-items-center mt-1">
        <img v-if="profile.reputation < 0" class="rotten-spud-img pe-3 pb-2 selectable"
          src="/src/assets/img/rottenSpud.png" alt="">
        <img v-else class="spud-img pe-3 selectable" src="/src/assets/img/spuditions.png" alt="">
        <h5 class="text-white"> {{ profile.reputation }}</h5>
      </div>
      <div v-if="profile.id != user.id">
        <div class="dropdown">
          <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
            data-bs-auto-close="outside">
            Review Profile
          </button>
          <form class="dropdown-menu p-4">
            <div class="mb-3">
              <label for="comment" class="form-label">Say a Few Words About This User</label>
              <input type="text" name="comment" class="form-control" id="commentInput">
            </div>
            <div class="mb-3">
              <label for="ratingProfile" class="form-label">Rating</label>
              <input type="password" name="ratingProfile" class="form-control" id="profileRating" >
            </div>
            <button v-if="!reviewedAlready" type="submit" class="btn btn-primary">Submit</button>
            <button class="btn btn-primary" v-else disabled>Submit</button>
          </form>
        </div>
      </div>
    </div>
    <div class="row justify-content-center pt-4 pb-5 bg-forestGreen">
      <div class="col-6 rounded bg-lightGreen p-3">
        <div class="row">
          <div class="col-12 col-md-6 inner-border">
            <h4 class="text-white rounded bg-forestGreen text-center p-2">Threads</h4>
            <h1 class="text-white text-center">{{ profile.threadCount }}</h1>
          </div>
          <div class="col-12 col-md-6">
            <h4 class="text-white rounded bg-forestGreen text-center p-2">Posts</h4>
            <h1 class="text-white text-center">{{ profile.postCount }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <h1 class="text-dark text-center my-5">Threads:</h1>

      <CommentCard />
    </div>
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