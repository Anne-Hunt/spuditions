<script setup>
import { computed } from 'vue';
import { Park } from '../models/Park.js';
import { AppState } from '../AppState.js';


const park = computed(() => AppState.activePark)
const activities = computed(() => AppState.activePark?.activities)



// const activityIcons = computed(()=>{
// 	switch(park.value.activities){
// 		case 'biking':
// 			return `<i class= "mdi mdi-bicycle"></i>`
// 		case 'bird watching':
// 			return `<i class= "mdi mdi-bird"></i>`
// 		case 'boating':
// 			return`<i class= "mdi mdi-ferry"></i>`
// 		case 'camping':
// 			return `<i class= "mdi mdi-tent"></i>`
// 		case 'climbing':
// 			return `<i class= "mdi mdi-carabiner"></i>`
// 		case 'cross country skiing':
// 			return `<i class= "mdi mdi-ski-cross-country"></i>`
// 		case 'disc golf':
// 			return `<i class= "mdi mdi-circle-slice-8"></i>`
// 		case 'experience idaho backpacks':
// 			return `<i class= "mdi mdi-bag-personal"></i>`
// 		case 'first time adventure':
// 			return `<i class= "mdi mdi-forest-outline"></i>`
// 		case 'fishing':
// 			return `<i class= "mdi mdi-fish"></i>`
// 		case 'hard path trails':
// 			return `<i class= "mdi mdi-map-marker-path"></i>`
// 		case 'hiking':
// 			return `<i class= "mdi mdi-hiking"></i>`
// 		case 'history':
// 			return `<i class= "mdi mdi-history"></i>`
// 		case ' horseback':
// 			return `<i class= "mdi mdi-horse-human"></i>`
// 		case 'horseshoe pits':
// 			return `<i class= "mdi mdi-horseshoe"></i>`
// 		case 'junior ranger':
// 			return `<i class= "mdi mdi-account-cowboy-hat"></i>`
// 		case 'learning':
// 			return `mdi-book-information-variant`
// 		case 'loaner fishing rods':
// 			return `<i class= "mdi mdi-hook"></i>`
// 		case 'paddlesports':
// 			return `<i class= "mdi mdi-kayaking"></i>`
// 		case 'playgrounds':
// 			return `<i class= "mdi mdi-slide"></i>`
// 		case 'RVing':
// 			return `<i class= "mdi mdi-rv-truck"></i>`
// 		case 'sailing':
// 			return`<i class= "mdi mdi-sail-boat"></i>`
// 		case 'sandboarding':
// 			return `<i class= "mdi mdi-snowboard"></i>`
// 		case 'snowmobiling':
// 			return `<i class= "mdi mdi-snowmobile"></i>`
// 		case 'snowshoeing':
// 			return `<i class= "mdi mdi-snowshoeing"></i>`
// 		case 'volunteering':
// 			return `<i class= "mdi mdi-hand-heart"></i>`
// 		case 'swimming':
// 			return `<i class= "mdi mdi-swim"></i>`
// 		case 'volleyball area':
// 			return `<i class= "mdi mdi-volleyball"></i>`
// 		case 'ATVs, UTVs, Motorbikes':
// 			return `<i class= "mdi mdi-atv"></i>`
// 		default:
// 			return ``
// 	}
// })

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
				<i :activity="activity" :class="icon[activity] || 'mdi mdi-tree'"></i>
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
						<h5 class="text-center">Park Info:</h5>
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
						<div class="mt-5 fs7 text-center" v-if="park.webUrl">
							<a :href="park.webUrl"><b>Click Here For Park Website</b></a>
						</div>
					</div>

					<div class="costsBox mt-3 mt-md-5 mb-3 col-12 col-md-5">
						<h5 class="text-center">Costs:</h5>
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
			<iframe class="mt-4 rounded" :src="park?.GmapsLocation" width="100%" height="300" style="border:0;"
				loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
	font-size: 1.2em;
}

.btn {
	border: 3px solid white;
}
</style>