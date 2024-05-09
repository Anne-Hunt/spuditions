<script setup>
import { computed } from "vue";
import { Post } from "../models/Post.js";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";
import { RouterLink } from "vue-router";


defineProps({ post: Post })

const account = computed(() => AppState.account)



async function destroyPost(postId) {
	try {
		const wantsToDestroy = await Pop.confirm("Are you sure you want to delete this comment?")
		if (!wantsToDestroy) return

		logger.log("Destroying post", postId)
		await postsService.destroyPost(postId)
	} catch (error) {
		Pop.toast("Could not delete this post", 'error')
		logger.error(error)
	}
}

</script>


<template>
	<div class="col-9">
		<div class="card bg-teal p-2 m-2 my-3">
			<div class="row py-2 d-flex">
				<div class="px-4 col-11 d-flex">
					<div class="vWall pe-3">
						<div class="text-center">
							<RouterLink :to="{ name: 'Profile', params: { profileId: post?.creatorId } }">
								<div>
									<img class="comment-img d-inline ms-1 mb-3" :src="post?.creator.picture"
										alt="picture of creator">
								</div>

								<div v-if="account?.role == 'Moderator'">
									<div class="p-1 text-center text-white rounded roleTag1">Moderator</div>
								</div>

								<div v-if="account?.role == 'Member'" class="p-1 text-center text-white rounded roleTag2">Member
								</div>

								<div v-if="account?.role == 'Banned'" class="p-1 text-center text-white rounded roleTag3">Banned
								</div>
							</RouterLink>
						</div>
					</div>

					<div class="ps-3">
						<p class="d-inline fw-bold">{{ post?.creator.name }}</p>
						<p>{{ post?.createdAtFormatted }}</p>

						<div class="w-100">
							<p>{{ post?.body }}</p>
						</div>
					</div>

				</div>
				<div v-if="post?.creatorId == account?.id" class="col-1 col-sm-1 col-md-1">
					<button @click="destroyPost(post.id)" class="btn btn-danger fs-5 float-end delete-post"><i
							class="mdi mdi-trash-can"></i></button>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.comment-img {
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