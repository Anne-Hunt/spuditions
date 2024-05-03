<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";


const profile = computed(() => AppState.activeProfile)

</script>


<template>
  <div class="row me-0 align-items-center bg-forestGreen">
    <div class="col-12 text-center p-4">
      <h3 class="fw-bold">Welcome back {Profile name}!</h3>
    </div>
    <!-- <div class="col-4">
    </div> -->
    <div class="col text-end">
      <img class="profile-img" src="https://www.slashfilm.com/img/gallery/michael-scotts-12-most-redeeming-moments-in-the-office/l-intro-1634858598.jpg" alt="">
    </div>
    <div class="col-5 text-start">
      Reputation
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

</style>