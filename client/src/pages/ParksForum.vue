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
            <button data-bs-toggle="modal" data-bs-target="#create-thread-modal" class="btn bg-forestGreen rounded text-white float-end mt-2 ms-2">Create Thread <i class="mdi mdi-plus"></i></button>
            <ModalWrap modalId="create-thread-modal">
              <ThreadModal/>
            </ModalWrap>
            <form>
        <div class="">
          <label class="p-2" for="parkChoose">Choose a Park:</label>
          <select name="parkChoose" v-model="parkChosen" id="parksList" class="rounded">
            <option v-for="park in parks" :key="park.id" :value="park.id">{{ park.name }}</option>
          </select>
        </div>
      </form>
      <div class="p-2 ">
            <h5 class="py-3">Explore park discussions, from general chatter to specific spots – pick your park above!</h5>
            </div>
            <button data-bs-toggle="modal" data-bs-target="#create-thread-modal" class="btn btn-forestGreen rounded text-white float-end mt-2 ms-2">Create Thread <i class="mdi mdi-plus"></i></button>
            <ModalWrap modalId="create-thread-modal">
              <ThreadModal/>
            </ModalWrap>
          </div>
        </div>

        <!-- //!SECTION - Thread card -->
        <div v-for="thread in threads" :key="thread?.id" class="col-12">
          <router-link :to="{ name: 'Thread Page', params: {threadId: thread.id}}">
            <ThreadCard :thread="thread"/>
          </router-link>
          </div>
      </div>
  </div>
  <ForumRules/>
  </section>
</template>


<style lang="scss" scoped>

.btn.bg-forestGreen:hover {
  background-color: var(--lightGreen);
    }

</style>