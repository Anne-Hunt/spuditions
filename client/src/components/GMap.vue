<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Park } from '../models/Park.js';

const park = computed(() => AppState.activePark)


</script>


<template>
	<GMapMap :center="{ lat: park.lat / 1, lng: park.lng / 1 }" :zoom="7" map-type-id="terrain"
		style="width: 90vw; height: 300px">
		<GMapMarker :position="{ lat: park.lat / 1, lng: park.lng / 1 }" />
	</GMapMap>

</template>


<style lang="scss" scoped></style>