<script setup>
import { onMounted, ref } from 'vue';
import { loadState } from '../utils/Store.js';
import Login from './Login.vue';
import SearchBar from "./SearchBar.vue";
import { router } from '../router.js';

const theme = ref(loadState('theme') || 'light')

onMounted(() => {
	document.documentElement.setAttribute('data-bs-theme', theme.value)
})



// function toggleTheme() {
// 	theme.value = theme.value == 'light' ? 'dark' : 'light'
// 	document.documentElement.setAttribute('data-bs-theme', theme.value)
// 	saveState('theme', theme.value)
// }

</script>

<template>
	<nav class="navbar navbar-expand-sm forestGreen px-3">
		<router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
			<div class="d-flex flex-column align-items-center">
				<img alt="logo" src="../assets/img/spuditionLogoWhite.png" height="45" />
			</div>
		</router-link>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
			aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav me-auto gap-3">
				<li>
					<router-link :to="{ name: 'Home' }"
						class="btn text-light lighten-30 selectable text-uppercase text-sm-start text-md-center">
						Home
					</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'About Us' }"
						class="btn text-light lighten-30 selectable text-uppercase text-sm-start text-md-center">
						About Us
					</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'General Chat Forum' }"
						class="btn text-light lighten-30 selectable text-uppercase text-sm-start text-md-center">
						Forums
					</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'Login' }" class="text-sm-start text-md-center">

						<Login class="mx-md-2" />

					</router-link>
				</li>
			</ul>

			<!-- LOGIN COMPONENT HERE -->
			<!-- <div>
        <button class="btn text-light" @click="toggleTheme"
          :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
          <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
        </button>
      </div> -->
		</div>
	</nav>

	<div v-if="router.currentRoute.value.name != 'Home' || 'Login'" class="w-100 pb-3 forestGreen">
		<SearchBar class="w-75 mx-auto" />
	</div>
</template>

<style scoped>
a:hover {
	text-decoration: none;
}

.nav-link {
	text-transform: uppercase;
}

.forestGreen {
	background-color: var(--forestGreen);
}



.navbar-nav .router-link-exact-active {
	border-bottom: 2px solid var(--lightGreen);
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
	nav {
		height: 64px;
	}
}
</style>
