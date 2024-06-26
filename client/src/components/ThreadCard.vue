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
	<div v-if="thread" class="container-fluid my-2">
		<div class="row justify-content-center">
			<div :class="{ 'col-md-10 col-12': !fullView, 'col-12': fullView }">
				<div class="card bg-teal rounded flex-row d-flex" style="min-width: 0;">
					<div class="ps-4 py-3 text-center">
						<RouterLink :to="{ name: 'Profile', params:{ profileId: thread.creatorId}}">
						<img :src="thread.creator.picture" class="pfp" height="40" alt="">
						<span class="d-block fs-6 fw-bold text-dark">{{ thread.creator.name }}</span>
						</RouterLink>
						<span class="d-block fs-6" :class="{
							'roleTag1': thread.creator.role == 'Moderator',
							'roleTag2': thread.creator.role == 'Member',
							'roleTag3': thread.creator.role == 'Banned'
						}">

							{{ thread.creator.role }}

						</span>
					</div>
					<div class="ps-4" :class="{ 'pt-4': !fullView, 'pt-2 pb-3': fullView }"
						:style="!fullView ? 'max-width: 55vw;' : ''">
						<div class="d-block">
							<span v-if="thread.tags.length > 0" class="bg-forestGreen px-2 py-1 text-light rounded me-2">{{ thread.tags[0]
								}}</span>
							<span class="fs-5 fw-bold">{{ thread.title }}</span>
						</div>
						<div :class="{ 'noWrap pt-2': !fullView, 'py-2': fullView }">
							{{ thread.body }}
						</div>
					</div>
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

.roleTag1 {
	// background-color: #9500ff99;
	color: #9500ff;
}

.roleTag2 {
	// background-color: #00000080;
	color: #5b5b5b
}

.roleTag3 {
	// background-color: #ff000099;
	color: #ff0000;
}

// .vWall {
// 	border-right: solid var(--bs-forestGreen) 1px;
// }

.delete-post {
	height: 45px;
	border-radius: 50em;
	aspect-ratio: 1/1;
}
</style>