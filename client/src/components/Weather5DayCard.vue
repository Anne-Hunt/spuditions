<script setup>
import { Weather } from '../models/Weather.js';

defineProps({
	weather: Weather
})
</script>



<template>
	<div class="col-12 col-md-4 col-lg-3 col-xl-2 vertical text-center p-1">

		<h3 class="day">{{ weather.date.toLocaleDateString('en-us', { weekday: 'long' }) }}</h3>

		<!-- <div class="time">
			<h2>{{ weather.date }}</h2>
		</div> -->

		<div class="forecast">
			<img :src="weather.WeatherIcon" :alt="'icon of' + weather.main">
		</div>

		<div class="temp d-flex gap-3 justify-content-center">
			<h5>Celcius: {{ weather.celcius }}&#176;</h5>
			<h5>Fahrenheit: {{ weather.fahrenheit }}&#176;</h5>
		</div>

	</div>


</template>


<style scoped lang="scss">
.vertical {
	border: 3px solid white;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border-radius: 15px;
	background-color: #D9814F;
}
</style>
