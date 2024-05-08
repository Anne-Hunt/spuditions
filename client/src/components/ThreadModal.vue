<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import { threadsService } from "../services/ThreadsService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { parksService } from "../services/ParksService.js";
import { router } from "../router.js";
import { Modal } from "bootstrap";


const route = useRoute()
const parks = computed(()=> AppState.parks)

const threadData = ref({
  title: '',
  body: '',
  tags: '',
  section: ''
})

function resetForm(){
threadData.value = {
  title: '',
  body: '',
  tags: '',
  section: '',
}
}

async function createThread(){
  try {
    logger.log("Creating a post", threadData)
    await threadsService.createThread(threadData.value)
    resetForm()

    Modal.getOrCreateInstance('create-thread-modal').hide()  
    router.push({ name: "Threads", params: AppState.activeThread.id })
  } catch (error) {
    Pop.toast("Could not create post", 'error')
    logger.error(error)
  }
}

async function getParks() {
	try {
		await parksService.getParks()
	} catch (error) {
		Pop.toast("Could not get Parks", 'error')
		logger.error(error)
	}
}

onMounted(()=>{
  getParks()
})
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
        <label for="selectSection">Select Topic</label>
        <select name="selectSection" v-model="threadData.section" id="section">
            <option value="general chat" default>General Chat</option>
            <option value="equipment">Equipment</option>
            <option value="find group">Find Group</option>
            <option value="park">Park</option>
        </select>
      </div>
      <div v-if="threadData.section == 'park'" >
        <label  for="selectPark">Select Park</label>
        <select v-model="threadData.section" name="selectPark" id="selectpark">
            <option v-for="park in parks" :key="park.id" :value="park.id">{{ park.name }}</option>
        </select>
      </div>
      <div>
        <label for="thread-tags">Tag</label>
        <input v-model="threadData.tags" type="text" class="form-control" id="thread-tags" required minLength="2" maxLength="10">
      </div>
      <button type="submit" class="btn btn-bgLightBlue float-end mt-2">Submit</button>
    </form>
  </div>
</template>


<style lang="scss" scoped>

</style>