<script setup>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";

const searchQuery = ref('')

const searchTerm = computed(() => AppState.searchTerm)

</script>

<!-- //FIXME - This is just a static form rn, still need to add functionality -->
<template>
	<form class="me-md-4">
		<div class="input-group">
			<input v-model="searchQuery" type="text" class="form-control" placeholder="Search" id="search-input">
			<button class="btn btn-orange widthBtn p-0"><i class="mdi mdi-magnify text-white fs-5"></i></button>
		</div>
	</form>
</template>


<style lang="scss" scoped>
.widthBtn {
	width: 4em;
}

#search-input {
    max-width: 250px;
}
</style>