<script setup>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { searchService } from "../services/SearchService.js";
import { router } from "../router.js";

const searchQuery = ref('')

const searchTerm = computed(() => AppState.searchTerm)

async function clearSearch(){
	try {
		await searchService.clearSearch()
		router.push({name: 'Home'})
	} catch (error) {
		logger.error("unable to clear search", error)
		Pop.toast("Unable to clear search", 'error')
	}
}

async function search(){
	try {
		this.router.push({ name: "Search Page", params: { query: searchQuery.value } })
		searchQuery.value = ''
	} catch (error) {
		logger.error('search failed', error)
		Pop.toast("Unable to search", 'error')
	}
}

</script>

<template>
	<form class="me-md-4" @submit.prevent="search()">
		<div class="input-group">
			<input v-model="searchQuery" type="text" class="form-control" placeholder="Search" id="search-input">
			<button class="btn btn-orange widthBtn p-0" type="submit"><i class="mdi mdi-magnify text-white fs-5"></i></button>
		</div>
	</form>
	<div v-if="searchTerm" class="mt-2"><div @click="clearSearch" role="button" class="btn btn-success clicky" title="clear search results">{{ searchTerm }}</div>

	</div>
</template>


<style lang="scss" scoped>
.widthBtn {
	width: 4em;
}

#search-input {
    max-width: 250px;
}

.clicky{
    cursor: pointer;
}
</style>