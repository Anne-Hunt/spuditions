<script setup>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { router } from '../router';
import { authService } from '../services/AuthService.js';

const user = computed(() => AppState.user)
const account = computed(() => AppState.account)

function logout() {
	authService.logout()
}

</script>

<template>
	<span class="navbar-text text-center">
		<router-link :to="{name: 'Login'}" class="d-md-inline d-block me-md-1 btn selectable text-light lighten-30 text-uppercase" v-if="!user">
			Login
        </router-link>
        <router-link :to="{name: 'Register'}" class="btn btn-orange selectable text-light lighten-30 text-uppercase" v-if="!user">
			Register
		</router-link>
		<div v-else>
			<div class="dropdown my-2 my-lg-0">
				<div type="button" class="border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
					<div v-if="account?.picture || user?.picture">
						<img :src="account?.picture || user?.picture" alt="account photo" height="40" class="pfp" />
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

<style lang="scss" scoped>
</style>
