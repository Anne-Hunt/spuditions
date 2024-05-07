<script setup>
import { computed, onMounted, ref } from 'vue';
import { Park } from '../models/Park.js';
import { AppState } from '../AppState.js';
import GMap from './GMap.vue';
import ParkFormModal from './ParkFormModal.vue';
import Pop from '../utils/Pop.js';
import { visitedService } from '../services/VisitedService.js';
import { useRoute } from 'vue-router';
import { Visited } from '../models/Visited.js';



const park = computed(() => AppState.activePark)
const activities = computed(() => AppState.activePark?.activities)
const userId = computed(() => AppState.account.id)
const visited = computed(() => AppState.visited)


const route = useRoute()


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

function getIconClass(activity) {
	return icon[activity] ? icon[activity] + ' icon-color' : 'mdi mdi-tree icon-color';
}

// Data
const showAll = ref(false);


// Computed property
const topFiveActivities = computed(() => {
	return showAll.value ? activities.value : activities.value.slice(0, 5);
});

// Method
function toggleShowAll() {
	showAll.value = !showAll.value;
}


async function getVisitedByPark() {
	try {
		await visitedService.getVisitedByPark(route.params.parkId)
	}
	catch (error) {
		Pop.toast("Could not get reviews or visited status by park id", 'error')
		console.error(error)
	}
}


const isVisited = computed(() => {

	const creatorId = visited.value
	const reviewCreatorId = AppState.visited.find(creatorId => creatorId == userId.value)

	// const reviewCreatorId = visited.creatorId

	// userId = reviewCreatorId ? result = true : result = false
	// return result

	if (userId.value == reviewCreatorId) {
		const visited = true
		return visited
	}
	else {
		const visited = false
		return visited
	}
});


onMounted(() => {
	getVisitedByPark()
})
</script>





<template>
	<section class="container-fluid mt-md-0" v-if="park">

		<div class="accordion accordion-flush row" id="accordionFlushExample">
			<div class="accordion-item col-12 col-md-6">
				<h2 class="accordion-header">
					<button class="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse"
						data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
						<!-- Image instead of dropdown arrow -->
						<img src="/src/assets/img/spuditions.png" alt="Dropdown Arrow" class="spudDropDown">
						Activities
					</button>
				</h2>

				<div id="flush-collapseOne" class="accordion-collapse collapse" v-if="park"
					data-bs-parent="#accordionFlushExample">
					<div class="accordion-body">
						<!-- Show the top 5 most popular activities -->
						<div class="activity-icons d-flex flex-wrap">
							<template v-for="(activity, index) in topFiveActivities" :key="index">
								<VTooltip>
									<i class="btn fs-5" :class="getIconClass(activity)" data-bs-toggle="tooltip"
										data-bs-placement="bottom" data-bs-custom-class="custom-tooltip" :data-bs-title="activity"
										:activity="activity"></i>
									<template #popper>{{ activity }}</template>
								</VTooltip>
							</template>
						</div>

						<div class="d-flex justify-content-center">
							<!-- Button to view more activities -->
							<button class="btn btn-primary mt-3 mx-auto" @click="toggleShowAll">
								{{ showAll ? 'Close All' : 'Show All' }} Activities</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Park Image and Info -->
		<div class="row mt-5 position-relative">
			<div class="col-12 col-md-7">
				<!-- Park Image -->
				<div class="position-relative">
					<img class="img-fluid rounded imgShadow" :src="park?.imgUrl" alt="">
					<!-- Overlay for Park Website Link -->
					<a :href="park?.webUrl" target="_blank" class="mb-2 mb-md-3 parkWebsiteLink rounded widthCustom">
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


				<!-- SECTION: Mark visited buttons -->
				<div class="d-flex flex-wrap justify-content-center justify-content-md-start mt-5 mb-5">

					<div v-if="park.isVisited == false">
						<button class="btn btn-orange borderBtn text-light mx-auto mx-md-0"
							title="Mark As Visited & Leave Review" data-bs-toggle="modal" data-bs-target="#parkFormModal">
							Have you visited this park?
						</button>
					</div>

					<div v-else>
						<button disabled class="btn btn-orange borderBtn text-light mx-auto mx-md-0"
							title="Park has been visited">
							You've Visited This Park!
						</button>
					</div>
					<!-- MORE INFO BUTTON -->
					<!-- <div v-if="park.description" class="text-center my-5">
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
					</div> -->
				</div>
			</div>
		</div>


		<div class="container-fluid mt-md-5">
			<div class="row justify-content-around flex-wrap">

				<!-- SECTION: Costs box -->
				<div class="accordion accordion-item col-12 col-md-5 mb-5 order-2 order-md-1" id="accordion2">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse"
							data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
							<!-- Image instead of dropdown arrow -->
							<img src="/src/assets/img/spuditions.png" alt="Dropdown Arrow" class="spudDropDown">

							<div>
								<h3 class="text-center">Costs:</h3>
								<i class="mdi mdi-information-outline fs6 color"></i>&nbsp;
								<i class="fs7">Non-resident charges are included on top of resident charges</i>
							</div>
						</button>
					</h2>

					<div id="flush-collapseTwo" class="accordion-collapse collapse" v-if="park" data-bs-parent="#accordion2">
						<div class="accordion-body">
							<li v-for="cost in park?.costs" :key="cost" class="fs-5 mb-2">
								{{ cost }}
							</li>
						</div>
					</div>
				</div>


				<!-- SECTION: Park description box -->
				<div class="accordion accordion-item col-12 col-md-5 mb-5 order-1 order-md-2" id="accordion3">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed mt-3 text-center" type="button" data-bs-toggle="collapse"
							data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
							<!-- Image instead of dropdown arrow -->
							<img src="/src/assets/img/spuditions.png" alt="Dropdown Arrow" class="spudDropDown">

							<div>
								<i class="fs7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								</i>
								<h4 class="text-center">Click Here To Learn More:</h4>
							</div>
						</button>
					</h2>

					<div id="flush-collapseThree" class="accordion-collapse collapse" v-if="park"
						data-bs-parent="#accordion3">
						<div class="accordion-body">
							{{ park?.description }}
						</div>
					</div>
				</div>

			</div>
		</div>
		<!-- Costs Box -->
		<!-- <div class="col-12 col-md-6 mt-3 mb-4 mt-md-5 mb-md-5">
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
				</div> -->



		<div class="d-flex justify-content-center mt-5">
			<GMap />
		</div>

	</section>

	<ParkFormModal />
</template>


<style lang="scss" scoped>
.accordion {
	border: none;
}

.accordion-button:not(.collapsed) {
	color: var(--bs-accordion-active-color);
	background-color: white;
	box-shadow: inset 0 calc(-1* var(--bs-accordion-border-width)) 0 white;
}

.accordion-button:is(.collapsed) {
	color: var(--bs-accordion-active-color);
	background-color: white;
	box-shadow: inset 0 calc(-1* var(--bs-accordion-border-width)) 0 white;
}

.accordion-button[data-v-81550567]:not(.collapsed) {
	color: var(--forestGreen);
	background-color: white;
	box-shadow: inset 0 calc(-1* var(--bs-accordion-border-width)) 0 white;
}

.accordion-button[data-v-81550567]:is(.collapsed) {
	color: var(--forestGreen);
	background-color: white;
	box-shadow: inset 0 calc(-1* var(--bs-accordion-border-width)) 0 white;
}

.accordion-button:hover {
	background-color: var(--lightGreen);
}

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

.parkWebsiteLink:hover {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	background-color: rgba(0, 0, 0, 0.579);
	padding: 8px 16px;
	color: #02a3e9;
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


.color {
	color: var(--lightGreen);
}


.accordion-header {
	background-color: #f8f9fa;
	border-bottom: 1px solid var(--forestGreen);
}

.accordion-header button {
	color: var(--forestGreen);
	font-weight: bold;
}

.accordion-header button:hover {
	color: var(--forestGreen);
}


/* Styling for accordion body */
.accordion-body {
	background-color: #fff;
	border-top: none;
}

.activity-icons {
	margin-top: 10px;
}

.activity-icons .btn {
	margin-right: 10px;
}

.spudDropDown {
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	width: 20px;
	height: auto;
}

.accordion-button {
	position: relative;
	padding-right: 40px;
}

.accordion-button::after {
	display: none !important;
}


/* Styling for button */
.btn-primary {
	background-color: var(--forestGreen);
	border-color: var(--lightGreen);
}

.btn-primary:hover {
	background-color: var(--lightGreen);
}



@media only screen and (max-width: 767px) {
	.widthCustom {
		width: 85%;
		text-align: center;
	}

	.fs6 {
		font-size: 0.8em;
	}

	.fs7 {
		font-size: .70em;
	}
}
</style>
