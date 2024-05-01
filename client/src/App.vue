<script setup>
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { router } from './router.js';

</script>

<template>
	<header>
		<Navbar v-if="router.currentRoute.value.name != 'Home'" />
	</header>
	<main>
		<router-view />
	</main>
	<!-- <footer class="bg-dark text-light">
		Made with 💖 by the Spuditions team
	</footer> -->
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
	--main-height: calc(100vh - 32px - 64px);
	--forestGreen: #696a42;
	--darkBrown: #674520;
	--black: #281409;
	--beigeSand: #B8914C;
	--orange: #D9814F;
	--teal: #A5C9C9;

	// EXTRAS:
	--lightGreen: #A8A96A;
	--btnPrimary: #00ADF8;
}


footer {
	display: grid;
	place-content: center;
	height: 32px;
}
</style>
