<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { AppState } from '../AppState.js';
import Navbar from '../components/Navbar.vue';
import ParkResult from '../components/ParkResult.vue';
import ThreadResult from '../components/ThreadResult.vue';
import ProfileResult from '../components/ProfileResult.vue'
import SearchBar from '../components/SearchBar.vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { threadsService } from '../services/ThreadsService.js';
import { profileService } from '../services/ProfileService.js';
import { parksService } from '../services/ParksService.js';
import { searchService } from '../services/SearchService.js';

const parks = computed(()=> AppState.parks)
const profiles = computed(()=> AppState.profiles)
const threads = computed(()=> AppState.threads)
const posts = computed(()=> AppState.posts)

const route = useRoute()

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

async function clearSearch(){
	try {
		await searchService.clearSearch()
	} catch (error) {
		Pop.toast("Unable to clear search", 'error')
	}
}

onMounted(() => {
    search()
})

onUnmounted(() => {
    clearSearch()
})

</script>

<template>
<div class="container justify-content-center mt-3">
    <div class="row" v-for="park in parks" :key="park.id">
        <ParkResult :park="park"/>
    </div>
    <hr>
    <div class="row" v-for="thread in threads" :key="thread.id">
        <ThreadResult :thread="thread"/>
    </div>
    <hr>
    <div class="row" v-for="profile in profiles" :key="profile.id">
        <ProfileResult :profile="profile"/>
    </div>
</div>

</template>


<style lang="scss" scoped>

</style>