<script setup>
import { computed } from 'vue';
import { Park } from '../models/Park.js';
import { AppState } from '../AppState.js';
import { Weather } from '../models/Weather.js';
import Weather4DayCard from './Weather4DayCard.vue';



const park = computed(() => AppState.activePark)
const activeWeather = computed(() => AppState.activeWeather)


</script>


<template>
	<div>
		<h4 class="pt-3">{{ park?.activities }}</h4>
	</div>
	<!-- Park Image -->
	<section class="container-fluid">
		<div class="row mt-5">
			<div class="col-6 ms-2">
				<img class="img-fluid rounded imgShadow" :src="park?.imgUrl" alt="">
			</div>

			<!-- Park Info -->
			<div class="col-5">
				<h4 class="text-light">{{ park?.name }} , ID</h4>
				<i class="mdi mdi-star p-1"></i>
				<i class="mdi mdi-star p-1"></i>
				<i class="mdi mdi-star p-1"></i>
				<i class="mdi mdi-star p-1"></i>
				<span class="selectable ms-4">800 ratings</span>
				<div>
					<h5 class="mt-5 text-light">{{ park?.type }}</h5>
					<h5 class="text-light">{{ park?.cost }}</h5>
					<h5 class="text-light">{{ park?.daysClosed }}</h5>
					<h5 class="text-light">{{ park?.rating }}</h5>
					<h5 class="text-light">{{ park?.region }}</h5>
				</div>
			</div>
		</div>

		<div>
			<iframe class="mt-4 rounded"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.993638145866!2d-116.2892546874821!3d43.60667407098388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54ae494ccd9917fd%3A0xd267ec81cdf20f95!2sBoise%20CodeWorks!5e0!3m2!1sen!2sus!4v1714588860986!5m2!1sen!2sus"
				width="100%" height="200" style="border:0;" loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
	</section>

	<hr class="my-3" />

	<!--************ SECTION: WEATHER ************-->
	<section class="container p-3">

		<div class="row">
			<h1>4 Day Forecast</h1>
		</div>

		<div v-for="day in activeWeather" :key="day.id" class="row">
			<Weather4DayCard :day="day" />
		</div>

	</section>
</template>


<style lang="scss" scoped>
.imgShadow {
	filter: drop-shadow(8px 10px 4px #7f7c7c6b);
}
</style>