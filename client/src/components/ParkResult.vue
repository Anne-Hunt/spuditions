<script setup>
import { Park } from "../models/Park.js";


defineProps({park: Park})

</script>


<template>
  <!-- //!SECTION - Very rough template, just for testing purposes -->
  <RouterLink :to="{name: 'Park Details', params: {parkId: park.id}}">
      <div class="card cardSize mb-3">
        <div class="row">
        <div class="col-4 image-fluid cardSize card-image">
            <img class="imgSize" :src="park.imgUrl" :alt="park.name">
          </div>
          <div class="col-8 card-body textBox">
            <h4>{{ park.name }}</h4>
            <p>{{ park.description }}</p>
          </div>
      </div>
      </div>
  </RouterLink>
</template>


<style lang="scss" scoped>

.textBox{
  height: 20dvh;
  overflow: hidden;
}

.cardSize{
    overflow: hidden;
    height: 30dvh;
}

.imgSize{
  height: 30dvh;
  object-position: center;
  object-fit: contain;
}
</style>