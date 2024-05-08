<script setup>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { profileService } from "../services/ProfileService.js";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import ThreadCard from "../components/ThreadCard.vue";
import { reputationService } from "../services/ReputationService.js";

const route = useRoute()

const profile = computed(() => AppState.activeProfile)
const user = computed(()=> AppState.account)
const reviewedAlready = computed(()=> AppState.reputation.find(reputation => reputation.creatorId == user.value.id))
const threads = computed(() => AppState.profileThreads)

const reputation = ref({
  comment: '',
  rating: 0
})

async function getProfile(){
  try {
    await profileService.getProfile(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get profile", 'error')
    logger.error(error)
  }
}

async function getReputation(){
  try {
    await profileService.getReputation(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get reputation", 'error')
    logger.error("unable to get reputation", error)
  }
}

async function getVisited(){
  try {
    await profileService.getVisited(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get reputation", 'error')
    logger.error("unable to get reputation", error)
  }
}

async function getPosts(){
  try {
    await profileService.getPosts(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get reputation", 'error')
    logger.error("unable to get reputation", error)
  }
}

async function getProfileThreads(){
  try {
    await profileService.getThreadsByProfile(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get profile's threads", 'error')
    logger.error(error)
  }
}

async function createReputation(){
  try {
    const repData = reputation.value
    await reputationService.createReputation(repData)
    reputation.value = {comment: '', rating: 0}
  } catch (error) {
    Pop.toast("Unable to review profile at this time", 'error')
    logger.error("unable to create reputation", error)
  }
}

onMounted(() => {
  getProfile()
  getProfileThreads()
  getVisited()
  getPosts()
  getReputation()
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
          <button type="button" class="btn btn-primary dropdown-toggle float-end" data-bs-toggle="dropdown" aria-expanded="false"
            data-bs-auto-close="outside">
            Review Profile
          </button>
          <form @submit.prevent="createReputation()" class="dropdown-menu p-4">
            <div class="mb-3">
              <label for="comment" class="form-label">Say a Few Words About This User</label>
              <input v-model="reputation.comment" type="text" name="comment" class="form-control" id="commentInput">
            </div>
            <div class="mb-3">
              <label for="ratingProfile" class="form-label">Rating</label>
              <select v-model="reputation.rating" name="ratingProfile" class="form-control" id="profileRating" >
                <option value="+1"><span>Good Spud</span></option>
                <option value="-1" selected><span>Bad Spud</span></option>
              </select>
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
      <div class v-for="thread in threads" :key="thread?.id">
        <ThreadCard :thread?="thread"/>
      </div>
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