<script setup>
import { Weather } from '../models/Weather.js';

defineProps({
	weather: Weather
})
</script>



<template>

	<div>
		<h5 class="day">{{ weather.dateDay }}</h5>

		<div class="time">
			<h2>{{ weather.dateTime }}</h2>
		</div>

		<div class="forecast">
			<div>{{ weather.WeatherIcon }}</div>
			<div class="mt-3">{{ weather.description }}</div>
		</div>

		<div class="temp d-flex gap-2">
			<h2 class="border">{{ weather.celcius }}</h2>
			<h2 class="border">{{ weather.fahrenheit }}</h2>
		</div>
	</div>

</template>



<style scoped lang="scss">
// .forecast {
// 	width: 422px;
// 	background-color: #34495e;
// 	padding: 15px;
// 	border-radius: 5px;
// }

// .forecast .city {
// 	font-size: 26px;
// 	color: rgba(255, 255, 255, 0.9);
// 	margin-bottom: 7px;
// 	font-weight: bold;
// 	text-align: center;
// }
</style>
