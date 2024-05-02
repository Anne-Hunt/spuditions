<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Park } from '../models/Park.js';

defineProps({park: Park})

</script>


<template>
  <GMapMap
      :center="park?.GmapsLocation"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 200px"
  >
  </GMapMap>

</template>


<style lang="scss" scoped>

</style>