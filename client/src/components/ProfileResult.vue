<script setup>
import { Profile } from '../models/Profile.js';


defineProps({profile: Profile})
</script>


<template>
	<RouterLink :to="{name: 'Profile', params: {profileId: profile.id}}">
		<div class="col-md-4 col-6 fontColor">
			<img class="profilePic rounded-circle mb-2" :src="profile.picture" :alt="profile.name">
			<h5>{{ profile.name }}</h5>
		</div>
	</RouterLink>
</template>


<style lang="scss" scoped>
.profilePic{
	height: 50px;
	width: fit-content;
	aspect-ratio: 1/1;
	border-radius: 50em;
	object-fit: cover;
	object-position: center
}

.fontColor {
    color: var(--forestGreen);
}

.fontColor:hover {
    color: var(--lightGreen);
}
</style>