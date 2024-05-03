<script setup>
import CommentCard from "../components/CommentCard.vue";
import Sidebar from "../components/Sidebar.vue";
import ThreadCard from "../components/ThreadCard.vue";


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
        <h1 class="d-inline">Equipment Forum</h1>
        <button class="btn btn-primary rounded text-white float-end">Create Post <i class="mdi mdi-plus"></i></button>
        <h5 class="py-3">ask others for equipment recommendations</h5>
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
  <div class="row me-0 justify-content-end">
    <CommentCard class="collapse" id="comments"/>
  </div>
  
</div>
</section>
</template>


<style lang="scss" scoped>

</style>