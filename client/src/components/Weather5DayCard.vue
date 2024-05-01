<script setup>
import { Weather } from '../models/Weather.js';

defineProps({
	weather: Weather
})
</script>



<template>
	<hr />
	<div>
		<h5 class="day">{{ weather.date }}</h5>

		<!-- <div class="time">
			<h2>{{ weather.date }}</h2>
		</div> -->

		<div class="forecast">
			<div>{{ weather.WeatherIcon }}</div>
			<div class="mt-3">{{ weather.description }}</div>
		</div>

		<div class="temp d-flex gap-2">
			<h2 class="border">{{ weather.celcius }}</h2>
			<h2 class="border">{{ weather.fahrenheit }}</h2>
		</div>
	</div>
	<hr />


</template>


<style scoped lang="scss"></style>
