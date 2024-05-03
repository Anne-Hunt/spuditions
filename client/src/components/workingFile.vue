<script setup>

</script>


<template>
	<div class="box mt-3 mt-md-5 mb-3 col-12 col-md-5">
						<h4 class="text-center">Costs:</h4>
						<div class="mt-1 text-center">
							<i class="mdi mdi-information-outline fs6 red"></i>&nbsp;
							<i class="fs7">Non-resident charges are included on top of resident charges</i>
						</div>
						<hr>
						<ul>
							<li v-for="cost in park?.costs" :key="cost" class="fs-5 mb-2">
								{{ cost }}
							</li>
						</ul>
					</div>
</template>


<style lang="scss" scoped>

</style>
