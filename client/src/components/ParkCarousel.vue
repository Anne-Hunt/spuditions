<script setup>
import { AppState } from "../AppState.js";
import { Park } from "../models/Park.js";

defineProps({park: Park})
const carouselParks = AppState.carouselParks

</script>


<template>
  <!-- NOTE Coming back to have carousel flip through api images -->
<div>
    <div id="carouselExampleDark" class="carousel carousel-dark slide">
  <div class="carousel-indicators hidden">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div v-for="park in carouselParks" :key="park.id" class="carousel-item active carouselStyling" data-bs-interval="10000">
      <img :src="park.imgUrl" class="d-block w-75 mx-auto rounded" :alt="park.name">
      <div class="carousel-caption d-none d-md-block mx-auto overflow">
        <h5>{{park.name}}</h5>
        <p>{{park.description}}</p>
      </div>
    </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</template>


<style lang="scss" scoped>

.hidden {
  display: none;
}

.carousel-inner {
  border-radius: 10px;
  overflow: hidden;
}

.carousel-item img {
  height: 35vh; 
  object-fit: cover;
}

.carousel-caption {
  width: 50%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px;
  padding: 10px;
}

.overflow{
    overflow:hidden;
}
</style>