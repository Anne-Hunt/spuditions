<script setup>
import { useRoute } from "vue-router";
import { parksService } from "../services/ParksService.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import ParkDetails from "../components/ParkDetails.vue";
import Weather5DayCard from "../components/Weather5DayCard.vue";
import WeatherTodayCard from "../components/WeatherTodayCard.vue";
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

async function changeForecast() {
	try {
		// TODO: write this function out
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
		<section class="text-light container-fluid" v-if="weatherForecast">
			<div v-if="weather == time">

				<div class="pb-5">
					<div class="row">
						<button class="btn btn-orange borderBtn text-light ms-md-5 mb-5 mb-md-0 btnPlacement"
							@click="changeForecast()">
							Change To Weekly Forecast
						</button>
					</div>

					<div class="row mb-1 mb-md-4">
						<h2 class="text-center">Today's Forecast</h2>
					</div>

					<div class="row justify-content-evenly gap-1">

						<WeatherTodayCard v-for="time in weatherForecast" :key="time.dt" :weather="time" class="my-3" />

					</div>
				</div>

			</div>


			<div v-else>

				<div class="pb-5">
					<div class="row">
						<button class="btn btn-orange borderBtn text-light ms-md-5 mb-5 mb-md-0 btnPlacement"
							@click="changeForecast()">
							Change To Today's Forecast
						</button>
					</div>

					<div class="row mb-1 mb-md-4">
						<h2 class="text-center">Next 5 Days Forecast</h2>
					</div>

					<div class="row justify-content-evenly px-3 px-md-5 gap-1">

						<Weather5DayCard v-for="day in weatherForecast" :key="day.dt" :weather="day" class="my-3" />

					</div>
				</div>

			</div>
		</section>

	</div>
</template>


<style lang="scss" scoped>
.pageColor {
	background-color: var(--lightGreen);

	// REVIEW: Tell me (emma) how these look for a redesign
	// background-color: #7db834;
	// background-color: #8ac87f;
	// background-color: #5cb25d;

}

.borderBtn {
	border: solid #674520;
	width: 9em;
}

@media only screen and (max-width: 767px) {
	.btnPlacement {
		margin-right: auto;
		margin-left: auto;
	}

	.borderBtn {
		border: solid #674520;
		width: 15em;
	}
}
</style>
