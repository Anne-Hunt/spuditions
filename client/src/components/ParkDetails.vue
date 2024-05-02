<script setup>
import { computed } from 'vue';
import { Park } from '../models/Park.js';
import { AppState } from '../AppState.js';


const park = computed(() => AppState.activePark)
const activities = computed(() => AppState.activePark?.activities)

const activityIcons = computed(() => {
	switch (park.value.activities) {
		case 'biking':
			return `<i class= "mdi mdi-bicycle"></i>`
		case 'bird watching':
			return `<i class= "mdi mdi-bird"></i>`
		case 'boating':
			return `<i class= "mdi mdi-ferry"></i>`
		case 'camping':
			return `<i class= "mdi mdi-tent"></i>`
		case 'climbing':
			return `<i class= "mdi mdi-carabiner"></i>`
		case 'cross country skiing':
			return `<i class= "mdi mdi-ski-cross-country"></i>`
		case 'disc golf':
			return `<i class= "mdi mdi-circle-slice-8"></i>`
		case 'experience idaho backpacks':
			return `<i class= "mdi mdi-bag-personal"></i>`
		case 'first time adventure':
			return `<i class= "mdi mdi-forest-outline"></i>`
		case 'fishing':
			return `<i class= "mdi mdi-fish"></i>`
		case 'hard path trails':
			return `<i class= "mdi mdi-map-marker-path"></i>`
		case 'hiking':
			return `<i class= "mdi mdi-hiking"></i>`
		case 'history':
			return `<i class= "mdi mdi-history"></i>`
		case ' horseback':
			return `<i class= "mdi mdi-horse-human"></i>`
		case 'horseshoe pits':
			return `<i class= "mdi mdi-horseshoe"></i>`
		case 'junior ranger':
			return `<i class= "mdi mdi-account-cowboy-hat"></i>`
		case 'learning':
			return `mdi-book-information-variant`
		case 'loaner fishing rods':
			return `<i class= "mdi mdi-hook"></i>`
		case 'paddlesports':
			return `<i class= "mdi mdi-kayaking"></i>`
		case 'playgrounds':
			return `<i class= "mdi mdi-slide"></i>`
		case 'RVing':
			return `<i class= "mdi mdi-rv-truck"></i>`
		case 'sailing':
			return `<i class= "mdi mdi-sail-boat"></i>`
		case 'sandboarding':
			return `<i class= "mdi mdi-snowboard"></i>`
		case 'snowmobiling':
			return `<i class= "mdi mdi-snowmobile"></i>`
		case 'snowshoeing':
			return `<i class= "mdi mdi-snowshoeing"></i>`
		case 'volunteering':
			return `<i class= "mdi mdi-hand-heart"></i>`
		case 'swimming':
			return `<i class= "mdi mdi-swim"></i>`
		case 'volleyball area':
			return `<i class= "mdi mdi-volleyball"></i>`
		case 'ATVs, UTVs, Motorbikes':
			return `<i class= "mdi mdi-atv"></i>`
		default:
			return ``
	}
})

</script>


<template>
	<div v-for="activity in activities" :key="activity">
		<h4 class="pt-3">{{ activity }}</h4>
	</div>
	<!-- Park Image -->
	<section class="container-fluid">
		<div class="row mt-5">
			<div class="col-12 col-md-7">
				<img class="img-fluid rounded imgShadow" :src="park?.imgUrl" alt="">
			</div>

			<!-- Park Info -->
			<div class="col-12 col-md-5 mt-4 mt-md-0">
				<div class="text-center text-md-start">
					<h4 class="text-light">{{ park?.name }} , ID</h4>
					<i class="mdi mdi-star p-1"></i>
					<i class="mdi mdi-star p-1"></i>
					<i class="mdi mdi-star p-1"></i>
					<i class="mdi mdi-star p-1"></i>
					<span class="selectable ms-4">800 ratings</span>
				</div>
				<div>
					<h5 class="mt-5 text-light">{{ park?.type }}</h5>
					<h5 class="text-light">{{ park?.cost }}</h5>
					<h5 class="text-light">{{ park?.daysClosed }}</h5>
					<h5 class="text-light">{{ park?.rating }}</h5>
					<h5 class="text-light">{{ park?.region }}</h5>
				</div>
			</div>
		</div>

		<div>
			<iframe class="mt-4 rounded"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.993638145866!2d-116.2892546874821!3d43.60667407098388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54ae494ccd9917fd%3A0xd267ec81cdf20f95!2sBoise%20CodeWorks!5e0!3m2!1sen!2sus!4v1714588860986!5m2!1sen!2sus"
				width="100%" height="200" style="border:0;" loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
	</section>
</template>


<style lang="scss" scoped>
.imgShadow {
	filter: drop-shadow(8px 10px 4px #696A42);

}
</style>