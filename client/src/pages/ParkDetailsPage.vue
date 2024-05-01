<script setup>
import { useRoute } from "vue-router";
import { parksService } from "../services/ParksService.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import ParkDetails from "../components/ParkDetails.vue";

//!SECTION - Allows us to use routes for getting to different pages
const route = useRoute()
//!SECTION - Gives us access to the active park from the AppState
const park = computed(() => AppState.activePark)

//!SECTION - Gets a park by its Id
async function getParkById(){
  try {
    await parksService.getParkById(route.params.parkId)
  } catch (error) {
    Pop.toast("Could not get park by its Id", 'error')
    console.error(error)
  }
}

//!SECTION - Loads the park on page load
onMounted(() => {
  getParkById()
})
</script>


<template>
  <div class="pageColor">
    <ParkDetails/>
  </div>


</template>


<style lang="scss" scoped>

.pageColor {
  background-color: var(--lightGreen)
}


</style>
