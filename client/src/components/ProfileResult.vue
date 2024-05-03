<script setup>
import { Profile } from '../models/Profile.js';


defineProps({profile: Profile})
</script>


<template>
    
<div class="col-md-4 col-6">
<img class="profilePic rounded-circle" :src="profile.picture" :alt="profile.name">
<h5>{{ profile.name }}</h5>
</div>
</template>


<style lang="scss" scoped>
.profilePic{
    max-height: 40px;
}
</style>