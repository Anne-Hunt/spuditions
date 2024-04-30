<script setup>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { parksService } from "../services/ParksService.js";
import { AppState } from "../AppState.js";
import ParkCard from "../components/ParkCard.vue";

const parks = computed(() => AppState.parks)

async function getParks(){
  try {
    await parksService.getParks()
  } catch (error) {
    Pop.toast("Could not get Parks", 'error')
    console.error(error)
  }
}

onMounted(() => {
  getParks()
})
</script>

<template>
  Hello World
  <!-- {{ parks }} -->
  <div v-for="park in parks" :key="park.id" class="col-4">
    <ParkCard :park="park"/>
  </div>
</template>

<style scoped lang="scss">

</style>
