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

async function getPostByThreadId(){
  try {
    await postsService.getPostByThreadId()
  } catch (error) {
    Pop.toast("Could not get posts for this thread", 'error')
    logger.error(error)
  }
}

async function getThreadById(){
  try {
    await threadsService.getThreadById(route.params.threadId)
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
    console.error(error)
  }
}

onMounted(() => {
  getThreadById()
  getPostByThreadId()
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
          <ThreadCard :thread="threads" :fullView="true"/>
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
        <CommentCard/>
      </div>
  </div>
  </section>
</template>



<style lang="scss" scoped>

</style>