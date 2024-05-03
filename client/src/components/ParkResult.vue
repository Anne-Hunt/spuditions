<script setup>
import { Park } from "../models/Park.js";


defineProps({park: Park})

</script>


<template>
  <!-- //!SECTION - Very rough template, just for testing purposes -->
  <RouterLink :to="{name: 'Park Details', params: {parkId: park.id}}">
    <div class="col-10">
      <div class="img-fluid card-image-start">
        <img :src="park.imgUrl" alt="">
        <div class="card-body">
          <h4>{{ park.name }}</h4>
          <p>{{ park.description }}</p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
.overflow{
    overflow:hidden;
    max-height: 20dvh;
}
</style>