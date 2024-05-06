<script setup>
import { logger } from '../utils/Logger.js';
import { ref } from 'vue'
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { visitedService } from '../services/VisitedService.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';


const route = useRoute()

const editableReviewData = ref({
	// REVIEW: review: 0 may break this somehow so keep your eye on it. Not sure what sets the default
	userRating: 5,
	body: '',
	// isVisited: 
})

async function createVisited() {
	try {
		logger.log('Creating review! ⭐', editableReviewData)
		// NOTE .value pulls out the data stored inside of the ref object (whatever is inside the parentheses)
		await visitedService.createVisited(editableReviewData.value)

		// NOTE form.reset()
		editableReviewData.value = {
			userRating: 5,
			body: '',
		}

		// NOTE closes Modal after submit
		Modal.getOrCreateInstance('#parkFormModal').hide()
	}
	catch (error) {
		Pop.error(error);
	}
}
</script>


<template>
	<div class="modal fade" id="parkFormModal" tabindex="-1" aria-labelledby="parkFormModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="parkFormModalLabel">Leave a Review!</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">

					<!-- NOTE .prevent is the equivalent of event.preventDefault() -->
					<form @submit.prevent="createVisited()">

						<div class="form-floating mb-3 text-center">
							<div class="fs-5 mb-2">Rate This Park</div>

							<select v-model="editableReviewData.userRating" class="form-select py-0 mb-5 fs-3" id="parkRating"
								aria-label="Floating label select example">
								<option :value="1">⭐</option>
								<option :value="2">⭐⭐</option>
								<option :value="3">⭐⭐⭐</option>
								<option :value="4">⭐⭐⭐⭐</option>
								<option selected :value="5">⭐⭐⭐⭐⭐</option>
							</select>
						</div>

						<div class="form-floating mb-3">

							<textarea v-model="editableReviewData.body" type="text" class="form-control rows" id="parkBody"
								name="parkBody" placeholder="Rating Reason" maxlength="500">
							</textarea>

							<label for="parkBody">Reason for rating...</label>
						</div>

						<div class="text-end">
							<button class="sendBtn rounded p-2 px-3" type="submit">
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