<script setup>
import { computed, onMounted } from "vue";
import Sidebar from "../components/Sidebar.vue";
import ThreadCard from "../components/ThreadCard.vue";
import { AppState } from "../AppState.js";
import { threadsService } from "../services/ThreadsService.js";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";

const threads = computed(() => AppState.activeThread)
const route = useRoute()


async function getThreadById(){
  try {
    await threadsService.getThreadById(route.params.threadId)
  } catch (error) {
    Pop.toast("Could not get thread by id", 'error')
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
        <!-- //FIXME - Need to replace info with profiles and stuff -->
        <div class="col-12">
          <ThreadCard :thread="threads" :fullView="true"/>
        </div>
      </div>
  </div>
  </section>
</template>


<style lang="scss" scoped>

</style>