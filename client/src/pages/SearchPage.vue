<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { AppState } from '../AppState.js';
import ParkResult from '../components/ParkResult.vue';
import ThreadResult from '../components/ThreadResult.vue';
import ProfileResult from '../components/ProfileResult.vue'
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { threadsService } from '../services/ThreadsService.js';
import { profileService } from '../services/ProfileService.js';
import { parksService } from '../services/ParksService.js';
import { searchService } from '../services/SearchService.js';
import { logger } from '../utils/Logger.js';

const parks = computed(()=> AppState.parks)
const profiles = computed(()=> AppState.profiles)
const threads = computed(()=> AppState.threads)
const searchTerm = computed(()=> AppState.searchTerm)
// const posts = computed(()=> AppState.posts)
const searchQuery = ref('')
const route = useRoute()
// const routes = route.params.searchTerm

async function search() {
    try {
        await parksService.searchParks(route.params.query)
       await profileService.searchProfiles(route.params.query)
		await threadsService.searchThreads(route.params.query)
    }
    catch (error){
      Pop.error(error);
    }
}

async function searchAll() {
    try {
        await parksService.searchParks(route.params.query)
		await profileService.searchProfiles(route.params.query)
		await threadsService.searchThreads(route.params.query)
    }
    catch (error){
      Pop.error(error);
    }
}

async function clearSearch(){
	try {
		await searchService.clearSearch()
	} catch (error) {
		Pop.toast("Unable to clear search", 'error')
	}
}

watch(
  () => route.fullPath,
  async() => {
    logger.log("route fullPath updated", route.fullPath);
    searchAll()
  }
);

onMounted(() => {
    search()
})

onUnmounted(() => {
    clearSearch()
})
</script>

<template>
    <div class="container justify-content-center mt-3">
<!-- profile -->

      <div v-if="profiles.length > 0">
        <div class="section-container">
          <h2 class="section-title fw-bold mt-5">Profiles</h2>
          <hr class="section-line">
        </div>
        <div class="row mb-4" v-for="profile in profiles" :key="profile.id">
          <ProfileResult :profile="profile"/>
        </div>
      </div>


      <!-- parks -->
      <div v-if="parks.length > 0">
        <div class="section-container">
          <h2 class="section-title fw-bold mt-5">Parks</h2>
          <hr class="section-line">
        </div>
        <div class="row mb-4" v-for="park in parks" :key="park.id">
          <ParkResult :park="park"/>
        </div>
        <hr>
      </div>

      
      <!-- threads -->
      <div v-if="threads.length > 0">
        <div class="section-container">
          <h2 class="section-title fw-bold mt-5">Threads</h2>
          <hr class="section-line">
        </div>
        <div class="row mb-4" v-for="thread in threads" :key="thread.id">
          <ThreadResult :thread="thread"/>
        </div>
   </div>


    </div>
  </template>
  
  <style lang="scss" scoped>

  
  .section-line {
    border-top: 2px solid #B8914C; 
    margin-bottom: 20px; 
  }
  </style>
  