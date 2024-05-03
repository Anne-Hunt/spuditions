<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";


const profile = computed(() => AppState.activeProfile)

</script>


<template>
  <div class="row me-0 align-items-center">
    <div class="col-12 text-center p-4">
      <h3 class="fw-bold text-white">{Profile name}</h3>
    </div>
    <!-- //!SECTION - Clickable reputation potatoes -->
    <div class="col text-end">
      <img class="profile-img" src="https://www.slashfilm.com/img/gallery/michael-scotts-12-most-redeeming-moments-in-the-office/l-intro-1634858598.jpg" alt="">
    </div>
    <div class="col-5 text-start d-flex align-items-center">
      <img class="rotten-spud-img px-4 pb-2 selectable" src="/src/assets/img/rottenSpud.png" alt="">
      <h5 class="text-white">8</h5>
      <img class="spud-img px-4 selectable" src="/src/assets/img/spuditions.png" alt="">
    </div>
  </div>

  <!-- //!SECTION - Thread & Reply container -->
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-6 rounded bg-lightGreen p-3">
        <div class="row">
          <div class="col-6 inner-border">
            <h4 class="text-white rounded bg-forestGreen text-center p-2">Threads Created:</h4>
            <!-- //FIXME - Add number of threads -->
            <h1 class="text-white text-center">#</h1>
          </div>
          <div class="col-6">
            <h4 class="text-white rounded bg-forestGreen text-center p-2">Replies Created:</h4>
            <!-- //FIXME - Add number of replies -->
            <h1 class="text-white text-center">#</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

  
    
</template>


<style lang="scss" scoped>
.profile-img{
  height: 150px;
  width: fit-content;
  aspect-ratio: 1/1;
  border-radius: 50em;
  object-fit: cover;
  object-position: center
}

.rotten-spud-img{
  height: 64px;
  width: fit-content;
  object-fit: cover;
  object-position: center;
}

.spud-img{
  height: 50px;
  width: fit-content;
  object-fit: cover;
  object-position: center;
}

.inner-border{
  border-right: 2px solid white;
}
</style>