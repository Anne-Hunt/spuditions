<script setup>
import { computed, onMounted, ref } from "vue";
import Pop from "../utils/Pop.js";
import { parksService } from "../services/ParksService.js";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";

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
		let randomIndex = (Math.floor((Math.random() * (AppState.parks.length -= 3))))
		AppState.carouselParks.push(AppState.parks[randomIndex], AppState.parks[randomIndex + 1], AppState.parks[randomIndex + 2])
		logger.log('parks in carousel', AppState.carouselParks)
	} catch (error) {
		logger.error("unable to select carousel parks", error)
		Pop.toast("Unable to show carousel", 'error')
	}
}

async function search(){
	try {
		this.router.push({ name: "Search Page", params: { query: searchQuery.value } })
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
	<section class="position-relative vidText">
		<video id="video" class="video-container" autoplay loop muted>
			<source src="../assets/video/hero-video.mp4" type="video/mp4">
		</video>

		<div class="container-fluid overlay">
			<div class="typewriter">
				<div class="text-light fw-bold customSize text-center">Visit A State Park Today</div>
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

	<!-- Search/Parks List -->

	<section class="container-fluid bg-lightGreen py-3">
		<!-- Adjusted container class for full-width background -->
		<div class="row justify-content-center">
			<div class="col-12 col-md-3 d-flex align-items-center verticalLine">
				<div class="bg-Gray rounded p-3">
					<div class="my-2 text-center">
						<i class="mdi mdi-magnify fs-4 me-2"></i>
						<span class="fs-4">Find A Park</span>
					</div>
					<form @submit.prevent="search()">
						<div class="form-floating mb-3">
							<input class="form-control rounded" type="text" v-model="searchQuery" id="searchBar">
							<!-- Added v-model for two-way binding -->
							<label for="searchBar" class="text-light"></label>
						</div>
						<!-- Adjusted button width -->
						<button type="submit" class="btn bg-beigeSand w-100">SEARCH</button>
					</form>
				</div>
			</div>
			<div class="col-12 col-md-9">
				<h4 class="text-center fw-bold mb-4">All Parks: (sorted A-Z)</h4>
				<hr>
				<div class="row ms-3">
					<div v-for="park in parks" :key="park.id" class="col-12 col-md-4 mb-3">
						<!-- Adjusted column width for small screens -->
						<p>{{ park.name }}</p>
					</div>
				</div>
			</div>
		</div>
	</section></template>




<style scoped lang="scss">
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

@media screen and (min-width: 768px) and (max-width: 900px) {
	.vidText{
		display: contents;
	}
	.imgText{
		display: none;
	}
	.texty{
		display: none !important;;
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

@media only screen and (max-width: 768px) {
  .vidText {
    display:none;
  }
  .imgText {
	display:flex;
	background-image: url('https://images.unsplash.com/photo-1599584290793-3cef41047738?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
	background-position: center;
	max-width: 100%;
	height: 40dvh;
  }

}


.verticalLine{
  border-right: 5px solid var(--forestGreen); 
  height: 650px;
  border-radius: 2px;
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
</style>
