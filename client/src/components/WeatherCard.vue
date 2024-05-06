<script setup>
import { Weather } from '../models/Weather.js';

defineProps({
	weather: Weather,
	option: Object
})
</script>



<template>
	<div class="col-12 col-md-4 col-lg-3 col-xl-2 weather-card p-1">
		<!-- Time -->
 <h3 class="day d-flex justify-content-center align-items-center mt-2 fw-bold">{{ weather.date.toLocaleString('en-us', option) }}</h3>
  
 <!-- Weather Icon -->
	<div class="d-flex justify-content-center align-items-center">
		<img :src="weather.WeatherIcon" :alt="'icon of' + weather.main">
	</div>
  
	<!-- Weather Description -->
	<div>
		<h5 class="d-flex justify-content-center align-items-center text-capitalize fw-bold">{{ weather.description }}</h5>
 </div>
  
 <!-- Weather Temp -->
	<div class="d-flex justify-content-center align-items-center">
		<div class="temperature">
 <h5>Celsius: {{ weather.celcius }}&#176;</h5>
 <h5>Fahrenheit: {{ weather.fahrenheit }}&#176;</h5>
		</div>
 </div>
	</div>
  </template>
  
  <style scoped lang="scss">
  .weather-card {
	// border: 3px solid white;
	border-radius: 15px;
	background: linear-gradient(to bottom, #4481eb, #04befe);
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
  }
  
  .weather-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
//   .forecast {
// 	margin-bottom: 10px;
//   }
  
  .forecast img {
	max-width: 100px;
  }
  
  .temperature {
	text-align: center;
  }
  
  .temperature h5 {
	margin: 5px 0;
  }
  
  .day {
	font-size: 18px; 
	margin-bottom: 10px;
  }
  
  </style>
  
