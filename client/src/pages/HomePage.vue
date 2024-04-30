<script setup>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { parksService } from "../services/ParksService.js";
import { AppState } from "../AppState.js";

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
</template>

<style scoped lang="scss">

</style>
