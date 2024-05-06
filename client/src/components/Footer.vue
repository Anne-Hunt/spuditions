<script setup>

</script>


<template>
	<footer class="container-flex">
		<div class="row bkcolor text-light p-3 py-md-4 px-md-5 w-100 m-0">
			<div class="col-6 col-md-3 text-start">
				<h5 class="fw-bold text-uppercase">Connect</h5>
				<router-link :to="{ name: 'General Chat Forum' }" class="footlink">Forums</router-link><br>
				<router-link :to="{ name: 'Search Page', params: { query: 'Park' } }" class="footlink">Search</router-link><br>
				<router-link :to="{ name: 'About Us' }" class="footlink">About Us</router-link>
			</div>
			<div class="col-6 col-md-3">
				<h5 class="fw-bold text-uppercase">Resources</h5>
				<a class="footlink" href="https://www.nps.gov/index.htm">National Parks Service</a><br>
				<a class="footlink" href="https://parksandrecreation.idaho.gov/">Idaho State Parks</a><br>
				<a class="footlink" href="https://parksandrecreation.idaho.gov/activities/camping-tents/">Idaho
					Campgrounds</a>
			</div>

			<hr class="hidden my-2 mt-3" />

			<div class="col-12 col-md-6 mt-md-0 d-flex align-items-center justify-content-center justify-content-md-end">

				<img src="/src/assets/img/spuditionLogoWhite.png" alt="Spuditions" class="logo">

			</div>
		</div>
	</footer>
</template>


<style lang="scss" scoped>
.bkcolor {
	background-color: var(--forestGreen);
	position: sticky;
}

.beige {
	color: var(--beigeSand);
}

.footlink {
	color: white;
	font-weight: bold;
	font-size: small;
}

.logo {
	max-height: 80px;
}

.hidden {
	display: none;
}

@media only screen and (max-width: 767px) {
	.logo {
		max-height: 60px;
	}

	.hidden {
		display: inline;
	}
}
</style>