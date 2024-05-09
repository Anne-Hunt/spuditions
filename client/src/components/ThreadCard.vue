<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Thread } from "../models/Thread.js";
import Pop from "../utils/Pop.js";
import { threadsService } from "../services/ThreadsService.js";
import { logger } from "../utils/Logger.js";


defineProps({ thread: Thread, fullView: { type: Boolean, default: false } })

const account = computed(() => AppState.account)


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
				<div class="vWall pe-3">
					<div class="text-center">
						<img class="mt-1 profile-img d-inline" :src="thread?.creator.picture" alt="image of creator">
						<p class="mt-1 mb-1 fw-bold">{{ thread.creator.name }}</p>

						<div v-if="thread.creator.role == 'Moderator'" class="p-1 text-center text-white rounded roleTag1">
							Moderator</div>

						<div v-if="thread.creator.role == 'Member'" class="p-1 text-center text-white rounded roleTag2">Member
						</div>

						<div v-if="thread.creator.role == 'Banned'" class="p-1 text-center text-white rounded roleTag3">Banned
						</div>
					</div>
				</div>

				<div class="pe-5 ps-3 w-100" :class="{ 'mb-2': fullView }">
					<span class="fw-bold fs-5">
						<span v-if="!fullView" class="bg-forestGreen rounded px-3 text-white fw-light fs-6 py-1 me-2">{{
							thread?.tags[0] }}
						</span>
						{{ thread?.title }}
					</span>
					<div>
						<p class="w-100 mt-3 pe-4" :class="{ 'noWrap': !fullView }">{{ thread?.body }}</p>
					</div>
				</div>

				<div>
					<!-- <button v-if="thread.creatorId == userId" @click.prevent="destroyThread(thread.id)"
						class="btn btn-danger fs-5 float-end delete-post" :title="`Delete Comment`">
						<i class="mdi mdi-trash-can"></i>
					</button> -->
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

.word-break {
	overflow-wrap: anywhere;
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

.roleTag1 {
	background-color: rgba(149, 0, 255, 0.6);
}

.roleTag2 {
	background-color: rgba(0, 0, 0, 0.5);
}

.roleTag3 {
	background-color: rgba(255, 0, 0, 0.6);
}

.vWall {
	border-right: solid var(--bs-forestGreen) 1px;
}
</style>