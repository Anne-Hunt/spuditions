<script setup>
import { Weather } from '../models/Weather.js';


</script>



<template>
	<section>

		<div class="forecast">

			<div class="days">
				<h5 class="day">{{ this.dateDay }}</h5>
				<div class="temp d-flex gap-2">
					<h2>{{ this.celcius }}</h2>
					<h2>{{ this.fahrenheit }}</h2>
				</div>
				<div class="time">
					<h2>{{ this.dateTime }}</h2>
				</div>
				<div class="forecast">
					<div>{{ this.iconId }}</div>
					<div>{{ this.description }}</div>
				</div>
			</div>

		</div>

	</section>
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
// }</style>
