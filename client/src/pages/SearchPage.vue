<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Navbar from '../components/Navbar.vue';
import PostResult from '../components/PostResult.vue';
import ParkResult from '../components/ParkResult.vue';
import ThreadResult from '../components/ThreadResult.vue';
import ProfileResult from '../components/ProfileResult.vue'
import SearchBar from '../components/SearchBar.vue';

const parks = computed(()=> AppState.parks)
const profiles = computed(()=> AppState.profiles)
const threads = computed(()=> AppState.threads)
const posts = computed(()=> AppState.posts)

</script>

<!-- //FIXME - Build out search page -->
<template>
<Navbar/>

<div class="container justify-content-center">
    <SearchBar class="col-md-8 col-10"/>
    <div class="row" v-for="park in parks" :key="park.id">
        <ParkResult :park="park"/>
    </div>
    <hr>
    <div class="row" v-for="thread in threads" :key="thread.id">
        <ThreadResult :thread="thread"/>
    </div>
    <hr>
    <div class="row" v-for="post in posts" :key="post.id">
        <PostResult :post="post"/>
    </div>
    <hr>
    <div class="row" v-for="profile in profiles" :key="profile.id">
        <ProfileResult :profile="profile"/>
    </div>
</div>
    
</template>


<style lang="scss" scoped>

</style>