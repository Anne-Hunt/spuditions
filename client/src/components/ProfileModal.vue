<script setup>
import { logger } from '../utils/Logger.js';
import { computed, ref } from 'vue'
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { reputationService } from '../services/ReputationService.js';
import { profileService } from '../services/ProfileService.js';


const profile = computed(() => AppState.activeProfile)
const user = computed(() => AppState.account)
const reviewedAlready = computed(() => AppState.reputation.find(reputation => reputation.creatorId == user.value.id))
const threads = computed(() => AppState.profileThreads)
const posts = computed(() => AppState.posts)
const visits = computed(() => AppState.visited)
const reps = computed(() => AppState.reputation)

const route = useRoute()

const reputation = ref({
	comment: '',
	rating: 0
})

// async function createVisited() {
// 	try {
// 		logger.log('Creating profile rating! ⭐', reputation)
// 		// NOTE .value pulls out the data stored inside of the ref object (whatever is inside the parentheses)
// 		await visitedService.createVisited(reputation.value)

// 		// NOTE form.reset()
// 		reputation.value = {
// 			comment: '',
// 			rating: 0
// 		}

// 		// NOTE closes Modal after submit
// 		Modal.getOrCreateInstance('#profileRatingModal').hide()
// 	}
// 	catch (error) {
// 		Pop.error(error);
// 	}
// }

async function getReputation() {
	try {
		await profileService.getReputation(route.params.profileId)
	} catch (error) {
		Pop.toast("Could not get reputation", 'error')
		logger.error("unable to get reputation", error)
	}
}
async function createReputation() {
	try {
		logger.log('Creating profile rating! ⭐', reputation)
		const repData = reputation.value
		await reputationService.createReputation(repData)
		reputation.value = { comment: '', rating: 0 }

		// NOTE closes Modal after submit
		Modal.getOrCreateInstance('#profileRatingModal').hide()

	} catch (error) {
		Pop.toast("Unable to review profile at this time", 'error')
		logger.error("unable to create reputation", error)
	}
}

</script>

<template>
	<div class="modal fade" id="profileRatingModal" tabindex="-1" aria-labelledby="profileRatingModalLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="profileRatingModalLabel">Leave a Review!</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">

					<!-- NOTE .prevent is the equivalent of event.preventDefault() -->
					<form @submit.prevent="createReputation()">

						<div class="form-floating mb-3 text-center">
							<div class="fs-5 mb-2">Say a Few Words About This User</div>

							<textarea v-model="reputation.comment" type="text" class="form-control rows" id="commentInput"
								name="comment" placeholder="Rating Reason" maxlength="500">
							</textarea>
						</div>

						<div class="form-floating mb-3">
							<div class="fs-5 mb-2 text-center">Rating</div>

							<select v-model="reputation.rating" class="form-select py-0 mb-5 fs-4" id="profileRating"
								aria-label="Floating label select example">

								<option :value="+1">
									<span>Good Spud +1</span>
								</option>

								<option :value="-1" selected>
									<span>Bad Spud -1</span>
								</option>

							</select>
						</div>

						<div class="text-end">
							<button v-if="!reviewedAlready" class="sendBtn rounded p-2 px-3" type="submit">
								<div class="text-light">Submit <i class="mdi mdi-send"></i></div>
							</button>
						</div>
					</form>

				</div>
			</div>
		</div>
	</div>

</template>


<style scoped>
.rows {
	min-height: 50vh;
}

.sendBtn {
	background-color: #02a3e9;
	border: none;
	transition: 0.4s;
}

.sendBtn:hover {
	background-color: var(--bgGreen);
}
</style>