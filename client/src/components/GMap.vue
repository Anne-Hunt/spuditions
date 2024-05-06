<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const park = computed(() => AppState.activePark)


</script>


<template>
<div class="rounded" style="width: 90vw; height: 300px; overflow: hidden;">
    <GMapMap :center="{ lat: park.lat / 1, lng: park.lng / 1 }" :zoom="7" map-type-id="terrain"
	style="width: 90vw; height: 300px">
        <GMapMarker :position="{ lat: park.lat / 1, lng: park.lng / 1 }" />
    </GMapMap>
</div>


</template>


<style lang="scss" scoped></style>