<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/PostsService.js";


const route = useRoute()

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

</script>


<template>
<div class="container-fluid">
    <form @submit.prevent="createPost()">
      <div>
        <label for="post-body">Body</label>
        <textarea v-model="postData.body" type="text" class="form-control" id="post-body" required minLength="5" maxLength="300" rows="5"></textarea>
      </div>
      <button class="btn btn-bgLightBlue float-end mt-2">Submit</button>
    </form>
  </div>
</template>


<style lang="scss" scoped>

</style>