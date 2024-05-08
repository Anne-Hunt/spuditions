<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Thread } from "../models/Thread.js";
import Pop from "../utils/Pop.js";
import { threadsService } from "../services/ThreadsService.js";
import { logger } from "../utils/Logger.js";


defineProps({ thread: Thread, fullView: { type: Boolean, default: false } })

const userId = computed(() => AppState.account?.id)


async function destroyThread(threadId) {
	try {
		const wantsToDestroy = await Pop.confirm("Are you sure you want to delete this thread?")

		if (!wantsToDestroy) return

		logger.log('DESTROYING THREAD 🌐🗑️', threadId)

		await threadsService.destroyThread(threadId)
	} catch (error) {
		Pop.error(error)
	}
}

</script>


<template>
	<div v-if="thread" class="card bg-teal p-2 m-4 my-2 pb-0">
		<div class="row py-2">
			<div class="px-4 col-12 d-flex">
				<div>
					<img class="mt-1 profile-img d-inline" :src="thread?.creator.picture" alt="image of creator">
				</div>

				<div class="pe-5 ps-3 w-100">
					<span class="fw-bold fs-5"><span v-for="tag in thread?.tags" :key="tag"
							class="bg-forestGreen rounded px-3 text-white fw-light fs-6 py-1 me-2">{{ tag }}</span> {{
								thread?.title }}</span>
					<p class="w-100" :class="{ 'noWrap': !fullView }">{{ thread?.body }}</p>
				</div>

				<div>
					<button v-if="thread.creatorId == userId" @click.prevent="destroyThread(thread.id)"
						class="btn btn-danger fs-5 float-end delete-post" :title="`Delete Comment`">
						<i class="mdi mdi-trash-can"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.noWrap {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.profile-img {
	height: 50px;
	width: fit-content;
	aspect-ratio: 1/1;
	border-radius: 50em;
	object-fit: cover;
	object-position: center
}

.delete-post {
	height: 45px;
	border-radius: 50em;
	aspect-ratio: 1/1;
}
</style>