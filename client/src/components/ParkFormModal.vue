<script setup>
import { logger } from '../utils/Logger.js';
import { ref } from 'vue'
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { parksService } from '../services/ParksService.js';

const editableReviewData = ref({
	// REVIEW: review: 0 may break this somehow so keep your eye on it. Not sure what sets the default
	review: 0,
	body: '',
})

async function createReview() {
	try {
		logger.log('Creating review! ⭐', editableReviewData)
		// NOTE .value pulls out the data stored inside of the ref object (whatever is inside the parentheses)

		await parksService.createReview(editableReviewData.value)

		// NOTE form.reset()
		editableReviewData.value = {
			review: 0,
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
					<form @submit.prevent="createReview()">

						<div class="form-floating mb-3 text-center">
							<div class="fs-5 mb-2">Rate This Park</div>

							<input type="hidden" v-model="editableReviewData.review" class="form-control rows" id="parkReview"
								required min="1" max="5" />

							<button @click="editableReviewData.review = 1" class="mx-2 starBtn">
								<span class="fa fa-star fs-2"></span>
							</button>

							<button @click="editableReviewData.review = 2" class="mx-2 starBtn">
								<span class="fa fa-star fs-2"></span>
							</button>

							<button @click="editableReviewData.review = 3" class="mx-2 starBtn">
								<span class="fa fa-star fs-2"></span>
							</button>

							<button @click="editableReviewData.review = 4" class="mx-2 starBtn">
								<span class="fa fa-star fs-2"></span>
							</button>

							<button @click="editableReviewData.review = 5" class="mx-2 starBtn">
								<span class="fa fa-star fs-2"></span>
							</button>
						</div>

						<div class="form-floating mb-3">

							<textarea v-model="editableReviewData.body" type="text" class="form-control rows" id="parkBody"
								placeholder="Rating Reason" maxlength="500">
							</textarea>

							<label for="postUrl">Reason for rating...</label>
						</div>

						<div class="text-end">
							<button class=" sendBtn rounded p-2 px-3" type="submit">
								<div class="text-light">Post&nbsp;&nbsp;<i class="mdi mdi-send"></i></div>
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

.starBtn {
	border: none;
	background-color: white;
}

/* NOTE: This is for anyone who needs to know what the class is for changing the star colors */
.checked {
	color: orange;
}

.fa-star:hover {
	color: orange;
	transition: 0.3s;
}

.fa-star:active {
	color: orange;
}
</style>