<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { parksService } from "../services/ParksService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { RouterLink } from "vue-router";


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

    <div class="col-md-2 d-none d-lg-block d-xl-block d-xxl-block">
      <nav class="sidenav">
        <section class="text-center sticky-top">
          <router-link :to="{ name: 'General Chat Forum' }">
            <div>General</div>
          </router-link>
          <router-link :to="{ name: 'Parks List' }">
            <div>Parks</div>
          </router-link>
          <router-link :to="{ name: 'Groups Forum' }">
            <div>Find Group</div>
          </router-link>
          <router-link :to="{ name: 'Equipment Forum' }">
            <div>Equipment</div>
          </router-link>
        </section>
      </nav>
    </div>

    <div class="col-12 d-lg-none d-xl-none d-xxl-none sticky-top pe-0">
      <nav class="topnav">
        <section class="text-center">
          <router-link :to="{ name: 'General Chat Forum' }">
            <div>General</div>
          </router-link>
          <router-link :to="{ name: 'Parks List' }">
            <div>Parks</div>
          </router-link>
          <router-link :to="{ name: 'Groups Forum' }">
            <div>Find Group</div>
          </router-link>
          <router-link :to="{ name: 'Equipment Forum' }">
            <div>Equipment</div>
          </router-link>
        </section>
      </nav>
    </div>

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
.sidenav{
  min-height: 100vh;
  height: 100%;
  position: relative;
  background-color: #D9814F;
}

.sidenav div {
  padding: 20px 8px 20px;
  font-size: 25px;
  color: white;
  display: block;
  border-bottom: 4px solid white;
  margin-left: 6px;
  margin-right: 6px;
}

.sidenav div:hover{
  color: black;
}

.topnav{
  padding-top: 10px;
  height: 55px;
  width: 100%;
  position: relative;
  max-height: max-content;
  background-color: #D9814F;
}

.topnav div {
  padding-top: 80px;
  padding-right: 20px;
  font-size: 20px;
  color: white;
  display: inline;
}

.topnav div:hover{
  color: black;
}
</style>