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
	<div class="col-12 col-md-10 col-lg-9">
		<div class="card bg-teal p-2 m-2 my-3">
			<div class="row w-100 py-2 px-lg-0 d-flex justify-content-between">
				<div class="px-md-4 col-12 col-md-10 d-flex">
					<div class="vWall pe-3">
						<div class="text-center">
							<RouterLink :to="{ name: 'Profile', params: { profileId: post?.creatorId } }">
								<div>
									<img class="comment-img d-inline ms-1 mb-1 text-center" :src="post?.creator.picture"
										alt="picture of creator">
								</div>

								<!-- <div v-if="post.creator.role == 'Moderator'">
									<div class="p-1 text-center rounded roleTag1">Moderator</div>
								</div>

								<div v-if="post.creator.role == 'Member'" class="p-1 text-center rounded roleTag2">
									Member
								</div>

								<div v-if="post.creator.role == 'Banned'" class="p-1 text-center rounded roleTag3">
									Banned
								</div> -->

								<span class="d-block fs-6" :class="{
									'roleTag1': post.creator.role == 'Moderator',
									'roleTag2': post.creator.role == 'Member',
									'roleTag3': post.creator.role == 'Banned'
								}">

									{{ post.creator.role }}

								</span>
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
				<div v-if="post?.creatorId == account?.id" class="col-md-1 d-flex justify-content-md-end">
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