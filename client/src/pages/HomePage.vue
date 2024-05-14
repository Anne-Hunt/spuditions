<script setup>
import { computed, onMounted, ref } from "vue";
import Pop from "../utils/Pop.js";
import { parksService } from "../services/ParksService.js";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { router } from "../router.js";
// @ts-ignore
import video from '../assets/video/hero-video.mp4';

const searchQuery = ref('')
const parks = computed(() => AppState.parks)
const carouselParks = computed(() => AppState.carouselParks)

async function getParks() {
	try {
		await parksService.getParks()
		setCarouselParks()
	} catch (error) {
		Pop.toast("Could not get Parks", 'error')
		logger.error(error)
	}
}

function setCarouselParks() {
	try {
		AppState.carouselParks = []
		for (let i = 0; i < 4; i++) {
			let randomIndex = (Math.floor((Math.random() * (AppState.parks.length))))
			AppState.carouselParks.push(AppState.parks[randomIndex])
		}
		logger.log('parks in carousel', AppState.carouselParks)
	} catch (error) {
		logger.error("unable to select carousel parks", error)
		Pop.toast("Unable to show carousel", 'error')
	}
}

async function search() {
	try {
		router.push({ name: "Search Page", params: { query: searchQuery.value } })
	} catch (error) {
		logger.error('search failed', error)
		Pop.toast("Unable to search", 'error')
	}
}


onMounted(() => {
	getParks()
})
</script>




<template>
	<!-- Video Hero -->
	<section class="position-relative imgText">
		<video id="video" class="video-container vidText" autoplay loop muted>
			<source :src="video" type="video/mp4">
		</video>
		<div class="d-flex justify-content-center">
			<div class="container-fluid overlay">
				<div class="typewriter">
					<div class="text-light fw-bold customSize text-center">Visit A State Park Today</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Parks Loading To Page -->
	<section class="container p-3 my-5">
		<div>
			<div id="carouselPark" class="carousel slide">
				<div class="carousel-inner">
					<div v-for="(park, i) in carouselParks" :key="park?.id"
						:class="i === 0 ? 'active carousel-item carouselStyling' : 'carousel-item carouselStyling'"
						data-bs-interval="10000">
						<RouterLink :to="{ name: 'Park Details', params: { parkId: park?.id } }">
							<div>
								<img :src="park?.imgUrl" class="d-block w-100 rounded" :alt="park?.name">
								<!-- Adjusted class to make image responsive -->
								<div class="carousel-caption d-block d-md-block mx-auto overflow">
									<h5>{{ park?.name }}</h5>
								</div>
							</div>

						</RouterLink>
					</div>
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#carouselPark" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#carouselPark" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	</section>

	<section class="container-fluid bg-lightGreen py-4">
		<!-- Adjusted container class for full-width background -->
		<div class="row">
			<div class="col-12">
				<div class="d-flex align-items-center justify-content-center">
					<div class="bg-Gray rounded p-2 w-100">
						<form @submit.prevent="search()">
							<div class="input-group p-3">
								<input v-model="searchQuery" type="text" class="form-control" placeholder="" aria-label="Search Button" aria-describedby="searchButton">
								<button class="btn btn-beigeSand" type="button" id="searchButton"><i class="mdi mdi-magnify fs-4 me-2"></i>Search</button>
							</div>
						</form>
					</div>
				</div>

			</div>
			<div class="container p-4">
					<h4 class="text-center fw-bold mb-5 mt-5 mt-md-1 fs-3">All Parks: (sorted A-Z)</h4>
					<div class="row g-3 px-5">
						<div v-for="park in parks" :key="park.id" class="col-4 parkFont">
							<!-- Adjusted column width for small screens -->
							<RouterLink :to="{ name: 'Park Details', params: { parkId: park.id } }">
								<p>{{ park.name }}</p>
							</RouterLink>
						</div>
					</div>
				</div>
			</div>
	</section>
</template>




<style scoped lang="scss">
a {
	color: inherit;
	text-decoration: none;
	transition: color 0.3s ease;
}

a:hover {
	color: white;
}

.video-container {
	filter: brightness(55%);
	width: 100%;
	height: 65vh;
	object-fit: cover;

}

.typewriter {
	width: 60ch;
	animation: typing 2s steps(27);
	font-family: monospace;
	font-size: 1em;
}

.overlay {
	position: absolute;
	width: 50%;
	// height: 65vh;
	left: 10%;
	top: 40%;



	.typewriter {
		width: 35ch;
		animation: typing 2s steps(50);
		white-space: nowrap;
		overflow: hidden;
		font-family: monospace;
		font-size: 2em;
	}

	@keyframes typing {
		from {
			width: 0
		}
	}

	.customSize {
		font-size: 40px;
	}
}

@media only screen and (max-width: 767px) {

	// REVIEW still not mobile friendly

	/* mobile view style */

	.overlay {
		position: absolute;
		width: 100%;
		left: 10%;
		top: 40%;
		padding: 0;

		/* overlay style */
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 10px;
	}

	.customSize {
		font-size: 40px;
		color: white;
		padding: 15px;
	}

	/* ----------------------------- */

	.vidText {
		display: contents;
	}

	.overlay {
		position: absolute;
		width: 50%;
		// height: 65vh;
		left: 17%;
		top: 40%;
		padding: 0;

		@keyframes typing {
			from {
				width: 0
			}
		}


	}
}

// @media only screen and (max-width: 767px) {
// 	.vidText {
// 		display: none;
// 	}

// }

.imgText {
	display: flex;
	background-image: url('https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?auto=compress&cs=tinysrgb&w=800');
	background-position: center;
	max-width: 100%;
	height: 65dvh;
}



@media only screen and (min-width: 768px) {
	.verticalLine {
		border-right: 5px solid var(--forestGreen);
		height: 800px;
	}
}

@media only screen and (max-width: 767px) {
	.verticalLine {
		display: none;
	}
}



.hidden {
	display: none;
}

.carousel-inner {
	border-radius: 10px;
	overflow: hidden;
}

.carousel-item img {
	height: 35vh;
	object-fit: cover;
}

.carousel-caption {
	width: 50%;
	display: flex;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	border-radius: 5px;
	padding: 10px;
}

.overflow {
	-webkit-line-clamp: 2;
	overflow: hidden;
}


.imgWidth {
	width: 90%;
}

.widthCustom {
	width: 50%;
	text-align: center;
}

@media screen and (min-width: 425px) and (max-width: 767px) {
	.overlay {
		position: absolute;
		width: 78%;
		// height: 65vh;
		left: 11%;
		top: 40%;
		padding: 0;

		@keyframes typing {
			from {
				width: 0
			}
		}

		.typewriter {
			width: 38ch;
			animation: typing 2s steps(27);
			font-family: monospace;
			font-size: 1em;
		}

		.customSize {
			display: flex;
			justify-content: center;
			font-size: 23px;
		}
	}
}

@media screen and (min-width: 375px) and (max-width: 424px) {
	.overlay {
		position: absolute;
		width: 88%;
		// height: 65vh;
		left: 5%;
		top: 40%;
		padding: 0px;

		@keyframes typing {
			from {
				width: 0
			}
		}

		.typewriter {
			width: 38ch;
			animation: typing 2s steps(27);
			font-family: monospace;
			font-size: 1em;
		}

		.customSize {
			display: flex;
			justify-content: center;
			font-size: 23px;
		}
	}
}

@media screen and (min-width: 320px) and (max-width: 374px) {
	.overlay {
		position: absolute;
		width: 88%;
		left: 6%;
		top: 40%;
		padding-left: 10px;
		padding-right: 10px;

		@keyframes typing {
			from {
				width: 0
			}
		}

		.typewriter {
			width: 30ch;
			animation: typing 2s steps(27);
			font-family: monospace;
			font-size: 1em;
		}

		.customSize {
			display: flex;
			justify-content: center;
			font-size: 20px;
		}
	}
}
</style>
