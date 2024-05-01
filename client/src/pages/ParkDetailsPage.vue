<script setup>
import { useRoute } from "vue-router";
import { parksService } from "../services/ParksService.js";
import Pop from "../utils/Pop.js";
import { computed, onBeforeMount, onMounted, watch } from "vue";
import { AppState } from "../AppState.js";
import ParkDetails from "../components/ParkDetails.vue";
import { Weather } from "../models/Weather.js";
import Weather4DayCard from "../components/Weather4DayCard.vue";
import { weathersService } from "../services/WeathersService.js";


//!SECTION - Allows us to use routes for getting to different pages
const route = useRoute()
//!SECTION - Gives us access to the active park from the AppState
const park = computed(() => AppState.activePark)
const weather = computed(() => AppState.activeWeather)

async function getParkAndWeather() {
    try {
        await parksService.getParkById(route.params.parkId)
        await weathersService.getWeather()
    }
    catch (error){
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
		<section class="text-light">
			<!-- <div v-if="forecast == today">

				<div class="container">
					<div class="row">
						<h1>Today's Forecast</h1>
					</div>

					<div v-for="time in weather" :key="time.dateTime" class="row">
						<WeatherTodayCard :time="time" />
					</div>
				</div>

			</div> -->


			<!-- <div v-else> -->

			<div class="container">
				<div class="row">
					<h2>4 Day Forecast</h2>
				</div>

				<div v-for="day in weather" :key="day.dateDay" class="row">
					<Weather4DayCard :day="day" />
				</div>
			</div>

			<!-- </div> -->
		</section>

	</div>
</template>


<style lang="scss" scoped>
.pageColor {
	background-color: var(--lightGreen)
}
</style>
