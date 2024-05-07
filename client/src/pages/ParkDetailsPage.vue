<script setup>
import { useRoute } from "vue-router";
import { parksService } from "../services/ParksService.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import ParkDetails from "../components/ParkDetails.vue";
import WeatherCard from "../components/WeatherCard.vue";
import { weathersService } from "../services/WeathersService.js";
import { logger } from "../utils/Logger.js";
import { nationalParksService } from "../services/NationaParksService.js";

const forecastSetting = ref(false) // true == 5day false == today

//!SECTION - Allows us to use routes for getting to different pages
const route = useRoute()
//!SECTION - Gives us access to the active park from the AppState
const park = computed(() => AppState.activePark)
const weatherForecast = computed(() => forecastSetting.value ? AppState.activeWeather.filter(x => x.date.getHours() == 12) : AppState.activeWeather.filter(x => x.date.getDay() == new Date().getDay()))

async function getParkAndWeather() {
	try {
		await parksService.getParkById(route.params.parkId)
		await weathersService.getWeather()
	}
	catch (error) {
		Pop.error(error);
	}
}

async function getWebcam() {
	try {
		const parkCode = AppState.activePark.parkCode
		await nationalParksService.getWebcam(parkCode)
	} catch (error) {
		logger.error("Unable to get webcam", error)
		Pop.toast("Unable to load webcam", error)
	}
}

async function changeForecast() {
	try {
		forecastSetting.value = !forecastSetting.value
	}
	catch (error) {
		Pop.error(error);
	}
}

//!SECTION - Loads the park on page load

onMounted(() => {
	getParkAndWeather()
	// getWebcam()
})

</script>


<template>
	<div class="container-fluid">

		<section class="row">
			<div class="col-12">
				<ParkDetails />
			</div>
		</section>



		<!--****** SECTION: WEATHER ******-->
		<section class="container-fluid" v-if="weatherForecast">

			<hr class="my-4" />

			<div class="btnPlacement">
				<button @click="changeForecast()" class="btn btn-orange borderBtn text-light ms-md-5 mb-5 mb-md-0">
					{{ forecastSetting ? "Show Today's Forecast" : "Show 5-day Forecast" }}
				</button>
			</div>


			<div class="pb-5">
				<div class="row mb-1 mb-md-4">
					<h2 class="text-center">{{ forecastSetting ? "Next 5 Day's Forecast" : "Today's Forecast" }}</h2>
				</div>

				<div class="row justify-content-evenly px-3 px-md-5 gap-1">

					<WeatherCard v-for="day in weatherForecast" :key="day.dt" :weather="day"
						:option="forecastSetting ? { weekday: 'long' } : { hour: 'numeric' }" class="my-3" />

				</div>
			</div>

		</section>
	</div>
</template>


<style lang="scss" scoped>
.borderBtn {
	border: solid #674520;
	width: 9em;
}

@media only screen and (max-width: 767px) {
	.btnPlacement {
		text-align: center;
	}

	.borderBtn {
		border: solid #674520;
		width: 15em;
	}
}
</style>
