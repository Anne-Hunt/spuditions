<script setup>
import { computed, onMounted, ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import ThreadCard from "../components/ThreadCard.vue";
import { AppState } from "../AppState.js";
import ModalWrap from "../components/ModalWrap.vue";
import ThreadModal from "../components/ThreadModal.vue";
import { threadsService } from "../services/ThreadsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";

const threads = computed(() => AppState.threads.filter((thread) => thread.section == 'parks'))
const parks = computed(()=> AppState.parks)

const parkChosen = ref({
  name: ''
})

async function getThreads(){
  try {
    await threadsService.getThreads()
  } catch (error) {
    Pop.toast("Could not get threads", 'error')
    logger.error(error)
  }
}

onMounted(() => {
  getThreads()
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
        <div class="col-12">
          <div class="p-3 mt-3 fw-bold">
            <h1 class="d-inline">Parks Chat</h1>
            <form>
        <div class="">
          <label for="parkChoose">Choose a Park:</label>
          <select name="parkChoose" v-model="parkChosen" id="parksList">
            <option v-for="park in parks" :key="park.id" :value="park.id">{{ park.name }}</option>
          </select>
        </div>
      </form>
            <button data-bs-toggle="modal" data-bs-target="#create-thread-modal" class="btn btn-primary rounded text-white float-end">Create Thread <i class="mdi mdi-plus"></i></button>
            <ModalWrap modalId="create-thread-modal">
              <ThreadModal/>
            </ModalWrap>
            <h5 class="py-3">discuss parks in general or specific parks - select park above</h5>
          </div>
        </div>

        <!-- //!SECTION - Thread card -->
        <!-- //FIXME - Need to replace info with profiles and stuff -->
        <div v-for="thread in threads" :key="thread?.id" class="col-12">
          <router-link :to="{ name: 'Thread Page', params: {threadId: thread.id}}">
            <ThreadCard :thread="thread"/>
          </router-link>
          </div>
      </div>
  </div>
  </section>
</template>


<style lang="scss" scoped>

</style>