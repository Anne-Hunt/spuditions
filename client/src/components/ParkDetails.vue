<script setup>
import { computed } from 'vue';
import { Park } from '../models/Park.js';
import { AppState } from '../AppState.js';


const park = computed(() => AppState.activePark)
const activities = computed(()=> AppState.activePark?.activities)


const icon = {
	'biking': `mdi mdi-bicycle`,
	'bird watching': 'mdi mdi-bird',
	'boating': 'mdi mdi-ferry',
	'camping': 'mdi mdi-tent',
	'climbing': 'mdi mdi-carabiner',
	'cross country skiing': 'mdi mdi-ski-cross-country',
	'disc golf': 'mdi mdi-circle-slice-8',
	'experience Idaho backpacks': 'mdi mdi-bag-personal',
	'first time adventure': 'mdi mdi-forest-outline',
	'fishing': 'mdi mdi-fish',
	'hard path trails': 'mdi mdi-map-marker-path',
	'hiking': 'mdi mdi-hiking',
	'history': 'mdi mdi-history',
	'horseback': 'mdi mdi-horse-human',
	'horseshoe pits': 'mdi mdi-horseshoe',
	'junior ranger': 'mdi mdi-account-cowboy-hat',
	'learning': 'mdi mdi-book-account',
	'loaner fishing rods': 'mdi mdi-hook',
	'paddlesports': 'mdi mdi-kayaking',
	'playgrounds': 'mdi mdi-slide',
	'RVing': 'mdi mdi-rv-truck',
	'sailing': 'mdi mdi-sail-boat',
	'sandboarding': 'mdi mdi-snowboard',
	'snowmobiling': 'mdi mdi-snowmobile',
	'snowshoeing': 'mdi mdi-snowshoeing',
	'volunteering': 'mdi mdi-hand-heart',
	'swimming': 'mdi mdi-swim',
	'volleyball area': 'mdi mdi-volleyball',
	'ATVs, UTVs, Motorbikes': 'mdi mdi-atv'
}

</script>


<template>
	<section class="container-fluid">
		<div class="row">
			<div class="col" v-for="activity in activities" :key="activity">
					<i :class="icon[activity] || 'mdi mdi-tree'"></i>
			</div>
		</div>
	<!-- Park Image -->
		<div class="row mt-5">
			<div class="col-12 col-md-7">
				<img class="img-fluid rounded imgShadow" :src="park?.imgUrl" alt="">
			</div>

			<!-- Park Info -->
			<div class="col-12 col-md-5 mt-4 mt-md-0">
				<div class="text-center text-md-start">
					<h4 class="text-light">{{ park?.name }} , ID</h4>
					<i class="mdi mdi-star p-1"></i>
					<i class="mdi mdi-star p-1"></i>
					<i class="mdi mdi-star p-1"></i>
					<i class="mdi mdi-star p-1"></i>
					<span class="selectable ms-4">800 ratings</span>
				</div>
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
			{{ park?.location }}
		</div>
	</section>
</template>


<style lang="scss" scoped>
.imgShadow {
	filter: drop-shadow(8px 10px 4px #696A42);

}

i{
	font-size: xx-large;
	color: white;
}

</style>