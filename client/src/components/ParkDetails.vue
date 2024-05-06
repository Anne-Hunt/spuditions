<script setup>
import { computed } from 'vue';
import { Park } from '../models/Park.js';
import { AppState } from '../AppState.js';
import GMap from './GMap.vue';
import ParkFormModal from './ParkFormModal.vue';


const park = computed(() => AppState.activePark)
const activities = computed(() => AppState.activePark?.activities)

scroll(0, 0)

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

async function changeVisitedStatus() {

}

function getIconClass(activity) {
	return icon[activity] ? icon[activity] + ' icon-color' : 'mdi mdi-tree icon-color';
}


</script>


<template>
	<section class="container-fluid mt-md-0" v-if="park">
		<div class="row">
			<div class="col" v-for="activity in activities" :key="activity">
				<button type="button" class="btn fs-5" :class="getIconClass(activity)" data-bs-toggle="tooltip"
					data-bs-placement="bottom" data-bs-custom-class="custom-tooltip" :data-bs-title="activity"
					:activity="activity"></button>
			</div>
		</div>
		<!-- Park Image and Info -->
		<div class="row mt-5 position-relative">
			<div class="col-12 col-md-7">
				<!-- Park Image -->
				<div class="position-relative">
					<img class="img-fluid rounded imgShadow" :src="park?.imgUrl" alt="">
					<!-- Overlay for Park Website Link -->
					<a :href="park?.webUrl" target="_blank" class=" mb-3 parkWebsiteLink rounded">
						Click Here For Park Website
					</a>
				</div>
			</div>


			<div class="col-12 col-md-5 mt-4 mt-md-0">
				<div>
					<div class="text-center text-md-start">
						<h4 class="fontColorDk fw-bold">{{ park?.name }} , ID</h4>

						<!-- Park Ratings -->
						<div class="d-flex align-items-center justify-content-center justify-content-md-start">
							<i class="mdi mdi-star p-1 fs-5"></i>
							<i class="mdi mdi-star p-1 fs-5"></i>
							<i class="mdi mdi-star p-1 fs-5"></i>
							<i class="mdi mdi-star p-1 fs-5"></i>
							<span class="selectable ms-4 fontColorDk">800 ratings</span>
						</div>
					</div>
					<!-- Park Info -->
					<div class="fs-5 mt-4" v-if="park.type">
						<b class="fontColorDk">Park Type:</b> {{ park?.type }}
					</div>
					<div class="mt-3 fs-5" v-if="park.address">
						<b class="fontColorDk">Address:</b> {{ park?.address }}
					</div>
					<div class="mt-3 fs-5" v-if="park.daysClosed">
						<b class="fontColorDk">Days Closed:</b> {{ park?.daysClosed }}
					</div>
					<div class="mt-3 fs-5" v-if="park.rating">
						<b class="fontColorDk">Park Rating:</b> {{ park?.rating }}
					</div>
					<div class="mt-3 fs-5" v-if="park.region">
						<b class="fontColorDk">Region:</b> {{ park?.region }}
					</div>
				</div>
				<div class="mt-5 text-center">
					<button @click="changeVisitedStatus()" class="btn btn-orange borderBtn text-light mx-auto mx-md-0"
						title="Mark As Visited" data-bs-toggle="modal" data-bs-target="#parkFormModal">
						Mark Park As Visited
					</button>
				</div>
			</div>
		</div>
		<!-- Costs Box and Buttons -->
		<div class="row mt-2">
			<div class="col">
				<div class="container-fluid">
					<div class="row">
						<!-- Costs Box -->
						<div class="col-12 col-md-6 my-5">
							<div class="box mb-3">
								<h4 class="text-center">Costs:</h4>
								<div class="mt-1 text-center">
									<i class="mdi mdi-information-outline fs6 red"></i>&nbsp;
									<i class="fs7">Non-resident charges are included on top of resident charges</i>
								</div>
								<hr>
								<ul>
									<li v-for="cost in park?.costs" :key="cost" class="fs-5 mb-2">
										{{ cost }}
									</li>
								</ul>
							</div>
						</div>
						<!-- Buttons -->
						<div class="col-12 col-md-6 my-5">
							<div class="text-md-start d-flex flex-column align-items-center align-md-start">
								<!-- Learn More Button -->
								<div class="text-center text-light" v-if="park.description">
									<hr>
									<p class="d-inline-flex gap-1 mx-auto">
										<a class="btn btn-btnPrimary text-white" data-bs-toggle="collapse" href="#collapseExample"
											role="button" aria-expanded="false" aria-controls="collapseExample">
											Click here to learn more
										</a>
									</p>
									<div class="collapse mb-3" id="collapseExample">
										<div class="card card-body text-start text-dark">
											{{ park?.description }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>







		<div class="d-flex justify-content-center">
			<GMap />
		</div>

	</section>

	<ParkFormModal />
</template>


<style lang="scss" scoped>
.fontColorDk {
	color: #3b3c25;
}

.fontColor {
	color: #696A42;
}

.icon-color {
	color: #3b3c25;
}

.imgShadow {
	filter: drop-shadow(8px 10px 4px #adadaae0);

}

.parkWebsiteLink {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	background-color: rgba(0, 0, 0, 0.579);
	padding: 8px 16px;
	color: white;
	text-decoration: none;
}

i {
	font-size: xx-large;
	color: var(--beigeSand);
}



a {
	color: var(--lightGreen);
	transition: 0.4s;
}

a:hover {
	color: var(--lightGreen);

}

.fs6 {
	font-size: 1.1em;
}

.fs7 {
	font-size: 1em;
}


.red {
	color: var(--lightGreen);
}
</style>