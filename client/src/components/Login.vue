<script setup>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { router } from '../router';
import { authService } from '../services/AuthService.js';

const user = computed(() => AppState.user)
const account = computed(() => AppState.account)

function login() {
	router.push({ name: "Login" })
}

function register() {
	router.push({ name: "Register" })
}

function logout() {
	authService.logout()
}

</script>

<template>
	<span class="navbar-text text-center">
		<button class="d-md-inline d-block mx-auto me-md-1 btn selectable text-light lighten-30 text-uppercase" @click="login" v-if="!user">
			Login
		</button>
        <button class="btn btn-orange selectable text-light lighten-30 text-uppercase" @click="register" v-if="!user">
			Register
		</button>
		<div v-else>
			<div class="dropdown my-2 my-lg-0">
				<div type="button" class="border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
					<div v-if="account?.picture || user?.picture">
						<img :src="account?.picture || user?.picture" alt="account photo" height="40" class="rounded-pill" />
					</div>
				</div>
				<div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
					<div class="list-group">
						<router-link :to="{ name: 'Account' }">
							<div class="list-group-item dropdown-item list-group-item-action">
								Manage Account
							</div>
						</router-link>
						<button @click="logout()"
							class="list-group-item dropdown-item list-group-item-action text-danger selectable">
							<i class="mdi mdi-logout"></i>
							Log out
						</button>
					</div>
				</div>
			</div>
		</div>
	</span>
</template>

<style lang="scss" scoped></style>
