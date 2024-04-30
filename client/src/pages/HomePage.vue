<script setup>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { parksService } from "../services/ParksService.js";
import { AppState } from "../AppState.js";
import ParkCard from "../components/ParkCard.vue";

const parks = computed(() => AppState.parks)

async function getParks() {
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
  <!-- Video Hero -->
  <video class="video-container" autoplay loop muted>
    <source src="../assets/Video/hero-video.mp4" type="video/mp4">
  </video>

  <!-- SECTION Home Page Introduction -->

  <section class="container-fluid introduction">
    <div class="row mx-5">
      <div class="col-12 col-lg-8 col-md-5 text-white">
        <h1 class="text-center">Visit A State Park Today!</h1>
      </div>
    </div>
  </section>




  <!-- Parks Loading To Page -->
  <div v-for="park in parks" :key="park.id" class="col-4">
    <ParkCard :park="park" />
  </div>
</template>





<style scoped lang="scss">
.video-container {
  filter: brightness(55%);
  width: 100%;
  height: 65vh;
  object-fit: cover;
}

.introduction {
  position: absolute;
  top: 45%;
  left: 62%;
  transform: translate(-50%, -50%);
}
</style>
