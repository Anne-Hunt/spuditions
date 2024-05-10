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
	<nav class="navbar navbar-expand-md forestGreen px-3">
        <div class="container-fluid">
            <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
                <div class="d-flex flex-column align-items-center">
                    <img alt="logo" src="../assets/img/spuditionLogoWhite.png" height="45" />
                </div>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
			aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse text-center " id="navbarText">
                <ul class="order-1 navbar-nav me-auto gap-md-3 w-100">
                    <li>
                        <router-link :to="{ name: 'About Us' }"
                        class="btn text-light lighten-30 selectable text-uppercase text-sm-start text-md-center">
                            About
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'General Chat Forum' }"
                        class="btn text-light lighten-30 selectable text-uppercase text-sm-start text-md-center">
                            Forums
                        </router-link>
                    </li>
                </ul>
        
                <div v-if="router.currentRoute.value.name != 'Home' && router.currentRoute.value.name != 'Login' && router.currentRoute.value.name != 'Register'" 
                class="order-3 order-md-2 d-flex justify-content-center forestGreen my-md-0 mb-2">
                <SearchBar />
                <!-- && router.currentRoute.value.name != 'Search Page' -->
                </div>
                
                <div class="order-2 order-md-3 text-center mb-2 my-md-0">
                    <Login />
                </div>
                <!-- LOGIN COMPONENT HERE -->
                <!-- <div>
                    <button class="btn text-light" @click="toggleTheme"
                    :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
                    <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
                </button>
            </div> -->
            </div>
        </div>
	</nav>
</template>

<style scoped>
.show {
    display: grid !important;
}

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

@media screen and (min-width: 768px) {
	nav {
		height: 64px;
	}

    .w-100 {
        width: unset !important;
    }
}
</style>
