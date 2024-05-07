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
				<div class="text-light fw-bold customSize">Visit A State Park Today</div>
			</div>
		</div>
	</section>
	<section class="imgText row align-items-center">
		<div class="typewriter texty text-center">
				<div class="text-light texty fw-bold"><h2 class="texty">Visit A State Park Today</h2></div>
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
								<img :src="park?.imgUrl" class="d-block w-75 mx-auto rounded" :alt="park?.name">
								<div class="carousel-caption d-block d-md-block mx-auto overflow">
									<h5>{{ park?.name }}</h5>
									<!-- <p class="mb-0">{{ park?.region }} | {{ park?.type }}</p> -->
								</div>
							</div>
						</RouterLink>
					</div>
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#carouselPark" data-bs-slide="prev">
					<span class="carousel-control-prev text-dark text-center" aria-hidden="true"><i
							class="mdi mdi-arrow-left fs-1"></i></span>
					<!-- <span class="visually-hidden">Previous</span> -->
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#carouselPark" data-bs-slide="next">
					<span class="carousel-control-next text-dark" aria-hidden="true"><i
							class="mdi mdi-arrow-right fs-1"></i></span>
					<!-- <span class="visually-hidden">Next</span> -->
				</button>
			</div>
		</div>
	</section>

	<!--Search/Parks List-->
	<section class="row bg-dark p-2">
		<div class="col-12 col-md-3 d-flex align-items-center">
			<div class="bg-warning rounded p-3">
				<div class="my-2"><i class="mdi mdi-magnify fs-3"></i><span class="fs-3">Search</span></div>
				<form @submit.prevent="search()">
					<div class="form-floating mb-5">
						<input v-model="searchQuery" class="form-control rounded" type="text" name="searchbar" id="searchBar">
						<label for="searchbar text-light"><i class="mdi mdi-magnify"></i></label>
					</div>
					<button type="submit" class="btn btn-danger text-end">SEARCH</button>
			</form>
			</div>
		</div>
		<div class="col-12 col-md-9 text-light">
			<h4 class="text-center">All Parks</h4>
			<div class="row">
				<div v-for="park in parks" :key="park.id" class="col-4">
					<p>{{ park.name }}</p>
				</div>
			</div>
		</div>
	</section>
</template>




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

	// 	.container {
	//   height: 100vh;
	//   display: flex;
	//   justify-content: center;
	//   align-items: center;
	// }

	.typewriter {
		width: 30ch;
		animation: typing 2s steps(27);
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

		.typewriter {
			width: 60ch;
			animation: typing 2s steps(27);
			font-family: monospace;
			font-size: 1em;
		}

		.customSize {
			display: flex;
			justify-content: center;
			font-size: 40px;
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
  .texty{
	display:contents !important;
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
</style>
