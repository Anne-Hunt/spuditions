<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import { threadsService } from "../services/ThreadsService.js";
import Pop from "../utils/Pop.js";


const route = useRoute()

const threadData = ref({
  title: '',
  body: '',
  tags: '',
})

function resetForm(){
threadData.value = {
  title: '',
  body: '',
  tags: '',
}
}

async function createThread(){
  try {
    logger.log("Creating a post", threadData)
    await threadsService.createThread(threadData.value)
    resetForm()
  } catch (error) {
    Pop.toast("Could not create post", 'error')
    console.error(error)
  }
}

</script>


<template>
  <div class="container-fluid">
    <form @submit.prevent="createThread()">
      <div>
        <label for="thread-title">Title</label>
        <input v-model="threadData.title" type="text" class="form-control" id="thread-title" required minlength="2" maxLength="20">
      </div>
      <div>
        <label for="thread-body">Thread</label>
        <textarea v-model="threadData.body" type="text" class="form-control" id="thread-body" required minLength="5" maxLength="300" rows="5"></textarea>
      </div>
      <div>
        <label for="thread-tags">Tag</label>
        <input v-model="threadData.tags" type="text" class="form-control" id="thread-tags" required minLength="2" maxLength="10">
      </div>
      <button class="btn btn-bgLightBlue float-end mt-2">Submit</button>
    </form>
  </div>
</template>


<style lang="scss" scoped>

</style>