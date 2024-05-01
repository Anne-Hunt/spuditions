<script setup>
import { computed } from 'vue';
import { Park } from '../models/Park.js';
import { AppState } from '../AppState.js';



const park = computed(() => AppState.activePark)

</script>


<template>
 <div>
    <h4 class="mt-3">{{ park?.activities }}</h4>
  </div>
<!-- Park Image -->
  <section class="container-fluid">
  <div class="row mt-5">
    <div class="col-6 ms-2">
    <img class="img-fluid rounded imgShadow" :src="park?.imgUrl" alt="">
  </div>

  <!-- Park Info -->
  <div class="col-5">
<h4 class="text-light">{{ park?.name }} , ID</h4>
<i class="mdi mdi-star p-1"></i>
<i class="mdi mdi-star p-1"></i>
<i class="mdi mdi-star p-1"></i>
<i class="mdi mdi-star p-1"></i>
<span class="selectable ms-4">800 ratings</span>
<div>
 <h5 class="mt-5 text-light">{{ park?.type }}</h5>
 <h5 class="text-light">{{ park?.cost }}</h5>
 <h5 class="text-light">{{ park?.daysClosed }}</h5>
 <h5 class="text-light">{{ park?.rating }}</h5>
 <h5 class="text-light">{{ park?.region }}</h5>

</div>
    </div>
</div>
  </section>
</template>


<style lang="scss" scoped>
.imgShadow {
  filter: drop-shadow(8px 10px 4px #7f7c7c6b);
}
</style>