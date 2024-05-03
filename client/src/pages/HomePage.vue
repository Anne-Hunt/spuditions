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
		setCarouselParks()
	} catch (error) {
		Pop.toast("Could not get Parks", 'error')
		logger.error(error)
	}
}

function setCarouselParks(){
	for(let i = 0; i < 2; i++){
		let chosen = []
		let randomIndex = (Math.random() * AppState.parks.length)
		chosen.push(AppState.parks[randomIndex])
		AppState.carouselParks = chosen
	}
}

onMounted(() => {
	getParks()
})
</script>




<template>
	<!-- Video Hero -->
	<section class="position-relative">
	<video id="video" class="video-container" autoplay loop muted>
		<source src="../assets/video/hero-video.mp4" type="video/mp4">
 </video>
  
	<div class="container overlay">
		<div class="typewriter">
		<h1 class="text-light fw-bold customSize">Visit A State Park Today</h1>
		</div>
	</div>
	</section>
  
  
	<!-- Parks Loading To Page -->
	<section>
 <div class="mb-5">
		<ParkCarousel />
	</div>
	</section>
  
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
.overlay {
	position: absolute;
	width: 100%;
	height: 65vh;
	left: 10%;
	top: 40%;
	
// 	.container {
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
.typewriter {
  width: 40ch;
  animation: typing 2s steps(27);
  white-space: nowrap;
  overflow: hidden;
  font-family: monospace;
  font-size: 2em;
}
@keyframes typing {
  from {
    width: 0
  }
}
.customSize {
	font-size: 40px;
}
}


</style>
