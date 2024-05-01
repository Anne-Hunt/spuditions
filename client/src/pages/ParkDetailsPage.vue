<script setup>
import { useRoute } from "vue-router";
import { parksService } from "../services/ParksService.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import ParkDetails from "../components/ParkDetails.vue";
import Weather5DayCard from "../components/Weather5DayCard.vue";
import { weathersService } from "../services/WeathersService.js";


//!SECTION - Allows us to use routes for getting to different pages
const route = useRoute()
//!SECTION - Gives us access to the active park from the AppState
const park = computed(() => AppState.activePark)
const weatherForecast = computed(() => AppState.activeWeather.filter(x => x.date.getHours() == 12))

async function getParkAndWeather() {
	try {
		await parksService.getParkById(route.params.parkId)
		await weathersService.getWeather()
	}
	catch (error) {
		Pop.error(error);
	}
}

//!SECTION - Loads the park on page load

onMounted(() => {
	getParkAndWeather()
})

</script>


<template>
	<div class="container-fluid pageColor">

		<section>
			<ParkDetails />
		</section>


		<hr class="my-4" />


		<!--****** SECTION: WEATHER ******-->
		<section class="text-light" v-if="weatherForecast">
			<!-- <div v-if="forecast == today">

				<div class="container-fluid">
					<div class="row">
						<h1><u>Today's Forecast</u></h1>
					</div>

					<div class="row justify-content-evenly">

						<WeatherTodayCard v-for="time in weatherForecast" :key="time.dt" :weather="time" />

					</div>
				</div>

			</div> -->


			<!-- <div v-else> -->

			<div class="container-fluid pb-5">
				<div class="row mb-4 text-center">
					<h2>Next 5 Days Forecast</h2>
				</div>

				<div class="row justify-content-evenly px-3 px-md-5 gap-1">

					<Weather5DayCard v-for="day in weatherForecast" :key="day.dt" :weather="day" class="my-3" />

				</div>
			</div>

			<!-- </div> -->
		</section>

	</div>
</template>


<style lang="scss" scoped>
.pageColor {
	background-color: var(--lightGreen);

	// TODO: Tell me (emma) how these look for a redesign
	// background-color: #7db834;
	// background-color: #8ac87f;
	// background-color: #5cb25d;

}
</style>
