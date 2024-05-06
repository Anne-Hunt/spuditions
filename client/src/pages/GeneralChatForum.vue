<script setup>
import { computed } from "vue";
import CommentCard from "../components/CommentCard.vue";
import Sidebar from "../components/Sidebar.vue";
import ThreadCard from "../components/ThreadCard.vue";
import { AppState } from "../AppState.js";
import ModalWrap from "../components/ModalWrap.vue";
import ThreadModal from "../components/ThreadModal.vue";
import { threadsService } from "../services/ThreadsService.js";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";

const account = computed(() => AppState.account)
const posts = computed(() => AppState.posts)
const route = useRoute()

// async function getGeneralThread(){
//   try {
//     await threadsService.getSingleThread()
    
//   } catch (error) {
//     Pop.toast("Could not get posts", 'error')
//     console.error(error)
//   }
// }

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
            <h1 class="d-inline">General Chat</h1>
            <button data-bs-toggle="modal" data-bs-target="#create-thread-modal" class="btn btn-primary rounded text-white float-end">Create Thread <i class="mdi mdi-plus"></i></button>
            <ModalWrap modalId="create-thread-modal">
              <ThreadModal/>
            </ModalWrap>
            <h5 class="py-3">discuss multiple topics</h5>
          </div>
        </div>

        
        <!-- //!SECTION - Thread card -->
        <!-- //FIXME - Need to replace info with profiles and stuff -->
        <div class="col-12">
          <ThreadCard/>
        </div>

        <!-- //!SECTION - Leave comment button -->
        <div class="col-12">
          <button class="btn btn-primary float-end me-4">Leave Comment <i class="mdi mdi-plus"></i></button>
        </div>
      </div>    
      
      <!-- //!SECTION - Comments -->
      <!-- //FIXME - Need to v-for over these comments -->
      <div v-for="post in posts" :key="post.id" class="row me-0 justify-content-end">
        <CommentCard :post="post" class="collapse" id="comments"/>
      </div>
      
  </div>
  </section>
</template>


<style lang="scss" scoped>

</style>