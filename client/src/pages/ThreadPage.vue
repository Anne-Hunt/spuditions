<script setup>
import { computed, onMounted, ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import ThreadCard from "../components/ThreadCard.vue";
import { AppState } from "../AppState.js";
import { threadsService } from "../services/ThreadsService.js";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import CommentCard from "../components/CommentCard.vue";
import { postsService } from "../services/PostsService.js";

const threads = computed(() => AppState.activeThread)
const route = useRoute()
const posts = computed(()=> AppState.posts)
const account = computed(() => AppState.account)


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

async function destroyThread(threadId){
  try {
    const wantsToDestroy = await Pop.confirm("Are you sure you want to delete this thread?")
    if(!wantsToDestroy) return
    logger.log("Destroying thread", threadId)
    await threadsService.destroyThread(threadId)
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
    <div class="col-12 col-md-12 col-lg-10">
      <!-- //!SECTION - Create Post button -->
      <div class="row me-0">
        <!-- //!SECTION - Thread card -->
        <div class="col-12">
          <div v-if="threads" class="card bg-teal p-2 m-4 my-2 pb-0">
        <div class="row py-2">
            <div class="px-4 col-12 d-flex mb-3">
                <div>
                    <img class="mt-1 profile-img d-inline" :src="threads.creator?.picture" :alt="threads.creator?.name"><span class="d-inline">{{ threads.creator.name }}</span>
                </div>
                <div class="pe-5 ps-3 w-100">
                  <span class="fw-bold fs-5">{{ threads?.title }}</span>
                  <p class="w-100" >{{ threads?.body }}</p>
                  <span v-for="tag in threads?.tags" :key="tag" class="bg-forestGreen rounded px-3 text-white fw-light fs-6 py-1 me-2">{{ tag }}</span>
                </div>
            </div>
            <div v-if="threads?.creatorId == account.id" class="col-12 col-sm-12 col-md-12">
                <button @click="destroyThread(threads.id)" class="btn btn-danger fs-5 float-end delete-post"><i class="mdi mdi-trash-can"></i></button>
            </div>
        </div>
    </div>
        </div>
        <div class="col-12">
          <div class="card p-2 mx-4 mt-3 bg-teal">
            <form @submit.prevent="createPost()">
              <div class="mt-3 mx-3">
                <textarea v-model="postData.body" placeholder="Share your thoughts..." type="text" class="form-control" id="post-body" required minLength="5" maxLength="300" rows="5"></textarea>
              </div>
              <button class="btn btn-bgLightBlue float-end mt-2">Submit</button>
            </form>
          </div>
        </div>
        <div v-for="post in posts" :key="post.id">
          <CommentCard :post="post"/>
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