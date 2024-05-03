<script setup>
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue'
import { computed } from 'vue';
import Footer from './components/Footer.vue'

const route = useRoute()

const backgroundColor = computed(() => {
	switch (route.name) {
		case 'Home':
			return '#FFFFFF'
		case 'Park Details':
			return '#FFFFFF'
		case 'Forum':
			return '#FFFFFF'
		case 'About Us':
			return '#A8A96A'
		case 'Profile':
			return '#696A42'
		default:
			return '#FFFFFF'
	}
})

</script>

<template>
	<div class="bColor m-0 p-0 container-flex">
		<header>
			<Navbar />
		</header>
		<main class="m-0 p-0 container-fluid background">
			<router-view />
		</main>
		<footer>
			<Footer />
		</footer>
	</div>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

main {
	min-height: 100vh;
}

:root {
	--main-height: calc(100vh - 32px - 64px);
	--forestGreen: #696a42;
	--darkBrown: #674520;
	--black: #281409;
	--beigeSand: #B8914C;
	--orange: #D9814F;
	--teal: #A5C9C9;
	--bgLightBlue: #2bb6cf;
	--bgGreen: #22c122;


	--lightGreen: #A8A96A;
	--btnPrimary: #00ADF8;
}

.bColor {
	background-color: v-bind(backgroundColor);
}
</style>
