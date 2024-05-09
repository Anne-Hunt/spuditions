<script setup>
import { computed, onMounted, ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import ThreadCard from "../components/ThreadCard.vue";
import { AppState } from "../AppState.js";
import { threadsService } from "../services/ThreadsService.js";
import { useRoute, useRouter } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import CommentCard from "../components/CommentCard.vue";
import { postsService } from "../services/PostsService.js";

const threads = computed(() => AppState.activeThread)
const route = useRoute()
const posts = computed(()=> AppState.posts)
const account = computed(() => AppState.account)
const router = useRouter()


async function getPostByThreadId(){
  try {
    const threadId = route.params.threadId
    await postsService.getPostByThreadId(threadId)
  } catch (error) {
    Pop.toast("Could not get posts for this thread", 'error')
    logger.error(error)
  }
}

async function getThreadById(){
  try {
    await threadsService.getThreadById(route.params.threadId)
    getPostByThreadId()
  } catch (error) {
    Pop.toast("Could not get thread by id", 'error')
    logger.error(error)
  }
}

const postData = ref({
  body: '',
  threadId: route.params.threadId
})

function resetForm(){
  postData.value = {
    body: '',
    threadId: route.params.threadId
  }
}

async function createPost(){
  try {
    logger.log("Creating a post", postData)
    await postsService.createPost(postData.value)

    resetForm()
  } catch (error) {
    Pop.toast("Could not create post", 'error')
    logger.error(error)
  }
}

const sectionToPath = {"general chat": "General Chat Forum", "equipment": "Equipment Forum", "park": "Parks Forum", "find group": "Groups Forum" }

async function destroyThread(threadId){
  try {
    const wantsToDestroy = await Pop.confirm("Are you sure you want to delete this thread?")
    if(!wantsToDestroy) return

    const section = AppState.activeThread.section
    logger.log("Destroying thread", threadId)
    await threadsService.destroyThread(threadId)
    router.push({name: sectionToPath[section]})
  } catch (error) {
    Pop.toast("Could not delete thread", 'error')
    logger.error(error)
  }
}

onMounted(() => {
  getThreadById()
})

</script>


<template>

  <!-- //!SECTION - Sticky sidebar -->
  <section class="row me-0">
    <Sidebar/>

    <!-- //!SECTION - Main section of the page -->
    <div class="col-12 col-md-12 col-lg-10 mt-4">
      <!-- //!SECTION - Create Post button -->
      <div class="row me-0">
        <!-- //!SECTION - Thread card -->
        <div class="col-12">
          <ThreadCard :thread="threads" :fullView="true"/>
          <button @click="destroyThread(threads.id)" v-if="threads?.creatorId == account?.id" class="btn btn-danger float-end me-4"><i class="mdi mdi-delete"></i> Delete thread</button>
        </div>
        <div class="col-12">
          <div class="card p-2 mx-4 mt-3 bg-teal">
            <form @submit.prevent="createPost()">
              <div class="mt-3 mx-3">
                <textarea v-model="postData.body" placeholder="Share your thoughts..." type="text" class="form-control" id="post-body" required minLength="5" maxLength="300" rows="5"></textarea>
              </div>
              <button v-if="!account" disabled class="btn btn-bgLightBlue float-end mt-2">Submit</button>
              <button v-else class="btn btn-bgLightBlue float-end mt-2">Submit</button>
            </form>
          </div>
        </div>
        <div class="my-4 mx-3">
          <CommentCard v-for="post in posts" :key="post.id" :post="post"/>
        </div>
      </div>
  </div>
  </section>
</template>



<style lang="scss" scoped>

.profile-img{
  height: 50px;
  width: fit-content;
  aspect-ratio: 1/1;
  border-radius: 50em;
  object-fit: cover;
  object-position: center
}

.delete-post{
  height: 45px;
  border-radius: 50em;
  aspect-ratio: 1/1;
}

</style>