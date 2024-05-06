<script setup>
import { Thread } from "../models/Thread.js";
import PostModal from "../components/PostModal.vue";
import ModalWrap from "../components/ModalWrap.vue";
import CommentCard from "../components/CommentCard.vue";


defineProps({thread: Thread})

</script>


<template>
<div class="card bg-teal p-2 m-4">
            <div class="row">
              <div class="col-12 col-md-1">
                <img class="profile-img d-inline" :src="thread?.creator?.name" alt="Creator img">
              </div>
              <div class="col-12 col-md-11">
                <p class="d-inline">{{ thread?.creator?.name }}</p>
                <p>"Days ago"</p>
              </div>
              <div class="col-12">
                <h4>{{ thread.title }}</h4>
                <p>{{ thread.body }}</p>
              </div>
              <div class="col-12">
            <button class="btn btn-white rounded-pill float-end" type="button" data-bs-toggle="collapse" data-bs-target="#comments" aria-expanded="false" aria-controls="comments"><i class="mdi mdi-comment-outline"></i> #</button>
            <h3 class="d-inline float-end px-3">#{{ thread.tags }}</h3>
          </div>
        </div>
    </div>
      <div class="col-12">
          <button data-bs-toggle="modal" data-bs-target="#create-post-modal" class="btn btn-primary float-end me-4 collapse" id="comments">Leave Comment <i class="mdi mdi-plus"></i></button>
          <ModalWrap modalId="create-post-modal">
            <PostModal/>
          </ModalWrap>
      </div>
      <div class="row me-0 justify-content-end">
        <CommentCard class="collapse" id="comments"/>
      </div>
</template>


<style lang="scss" scoped>
.noWrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.profile-img{
  height: 50px;
  width: fit-content;
  aspect-ratio: 1/1;
  border-radius: 50em;
  object-fit: cover;
  object-position: center
}
</style>