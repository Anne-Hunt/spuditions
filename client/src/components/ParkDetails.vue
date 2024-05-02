<script setup>
import { computed } from 'vue';
import { Park } from '../models/Park.js';
import { AppState } from '../AppState.js';
import GMap from './GMap.vue';


const park = computed(() => AppState.activePark)
const activities = computed(() => AppState.activePark?.activities)

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
	<section class="container-fluid" v-if="park">
		<div class="row">
			<div class="col" v-for="activity in activities" :key="activity">
				<i :data-bs-title="activity" :class="icon[activity] || 'mdi mdi-tree'"></i>
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
					<i class="mdi mdi-star p-1 fs-5"></i>
					<i class="mdi mdi-star p-1 fs-5"></i>
					<i class="mdi mdi-star p-1 fs-5"></i>
					<i class="mdi mdi-star p-1 fs-5"></i>
					<span class="selectable ms-4">800 ratings</span>
				</div>

				<div class="text-md-start mt-5 d-flex gap-3">

					<!-- TODO: get marked visited button working -->
					<button @click="changeVisitedStatus()" class="btn btn-orange borderBtn text-light mx-auto mx-md-0">
						Mark As Visited
					</button>

					<!-- <button @click="changeVisitedStatus()" class="btn btn-success borderBtn text-light">
						You Visited This Park!
					</button> -->

				</div>

				<div class="text-center text-md-start text-light" v-if="park.description">
					<hr>
					<p class="d-inline-flex gap-1 mx-auto">
						<a class="btn btn-btnPrimary text-white" data-bs-toggle="collapse" href="#collapseExample"
							role="button" aria-expanded="false" aria-controls="collapseExample">
							Click here to learn more
						</a>
					</p>
					<div class="collapse" id="collapseExample">
						<div class="card card-body text-start text-dark">
							{{ park?.description }}
						</div>
					</div>
				</div>

			</div>


			<div class="col-12">
				<div class="text-light d-flex justify-content-evenly gap-md-5 row">

					<div class="costsBox mt-5 mb-3 col-12 col-md-5">
						<h4 class="text-center">Park Info:</h4>
						<div class="mt-1 fs7 text-center" v-if="park.webUrl">
							<a :href="park?.webUrl" target="_blank"><b>Click Here For Park Website</b></a>
						</div>
						<hr>

						<div class="fs-5" v-if="park.type">
							<b><u>Park Type</u>:</b> {{ park?.type }}
						</div>
						<div class="mt-3 fs-5" v-if="park.address">
							<b><u>Address</u>:</b> {{ park?.address }}
						</div>
						<div class="mt-3 fs-5" v-if="park.daysClosed">
							<b><u>Days Closed</u>:</b> {{ park?.daysClosed }}
						</div>
						<div class="mt-3 fs-5" v-if="park.rating">
							<b><u>Park Rating</u>:</b> {{ park?.rating }}
						</div>
						<div class="mt-3 fs-5" v-if="park.region">
							<b><u>Region</u>:</b> {{ park?.region }}
						</div>
					</div>

					<div class="costsBox mt-3 mt-md-5 mb-3 col-12 col-md-5">
						<h4 class="text-center">Costs:</h4>
						<hr>
						<ul>
							<li v-for="cost in park?.costs" :key="cost" class="fs-5 mb-2">
								{{ cost }}
							</li>
						</ul>
					</div>

				</div>
			</div>
		</div>

		<div>
			{{ park.location }}
			<GMap />
		</div>
	</section>
</template>


<style lang="scss" scoped>
.imgShadow {
	filter: drop-shadow(8px 10px 4px #696A42);

}

i {
	font-size: xx-large;
	color: white;
}

.costsBox {
	border: 3px solid white;
	padding: 1em;
	border-radius: 15px;
}

a {
	color: #6700ed;
	transition: 0.4s;
}

a:hover {
	color: #3900ab;
}

.fs6 {
	font-size: 1.1em;
}

.fs7 {
	font-size: 1em;
}

.btn {
	border: 3px solid white;
}
</style>