<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { parksService } from "../services/ParksService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { RouterLink } from "vue-router";
import Sidebar from "../components/Sidebar.vue";


const parks = computed(() => AppState.parks)

async function getParks() {
	try {
		await parksService.getParks()
	} catch (error) {
		Pop.toast("Could not get Parks", 'error')
		logger.error(error)
	}
}

onMounted(() => {
	getParks()
})

</script>


<template>
  <section class="row me-0">
    <Sidebar/>

    <div class="col-12 col-md-12 col-lg-10">
      <div class="row me-0">
        <div class="col-12">
          <div class="p-3 mt-3 fw-bold">
            <h1 class="d-inline">Parks List</h1>
            <h5 class="py-3">choose a park to find discussions</h5>
          </div>
        </div>
      </div>

      <!-- //FIXME - Need to add functionality so when you click on a name it takes you to the specific park forum -->
      <!-- //FIXME - Also need to make the styling look better lol -->
      <div class="row me-0 px-3">
        <div v-for="park in parks" :key="park.id" class="col-6 col-md-4 text-center p-2 selectable shadow-sm rounded g-2 card-style">
          <router-link :to="{name: 'Parks Forum'}" class="text-black m-0">
            <h3>{{ park.name }}</h3>
          </router-link>
          </div>
      </div>
    </div>

  </section>
</template>


<style lang="scss" scoped>

</style>