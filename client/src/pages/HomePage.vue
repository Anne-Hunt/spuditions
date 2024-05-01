<script setup>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { parksService } from "../services/ParksService.js";
import { AppState } from "../AppState.js";
import ParkCard from "../components/ParkCard.vue";
import ParkCarousel from "../components/ParkCarousel.vue";
import { logger } from "../utils/Logger.js";


const parks = computed(() => AppState.parks)

async function getParks() {
	try {
		await parksService.getParks()
	} catch (error) {
		Pop.toast("Could not get Parks", 'error')
		logger.error(error)
	}
}

onMounted(() => {
	getParks()
})
</script>




<template>
	<!-- Video Hero -->
	<section>

		<video class="video-container" autoplay loop muted>
			<source src="../assets/Video/hero-video.mp4" type="video/mp4">
		</video>
		<h1 class="text-center">Visit A State Park Today!</h1>
	</section>

	<!-- SECTION Home Page Introduction -->

	<section class="container-fluid heroText">
		<div class="row">
			<div class="col-12 col-lg-8 col-md-5 text-light">

			</div>
		</div>
	</section>


	<div class="mb-5">
		<ParkCarousel />
	</div>

	<!-- Parks Loading To Page -->

	<!-- Populated correctly- not part of figma design -->

	<div v-for="park in parks" :key="park.id" class="col-4">
    <ParkCard :park="park" />
  </div>
</template>





<style scoped lang="scss">
.video-container {
	filter: brightness(55%);
	width: 100%;
	height: 65vh;
	object-fit: cover;
}

.heroText {}
</style>
