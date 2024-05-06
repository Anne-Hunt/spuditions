<script setup>
import { Post } from "../models/Post.js";

defineProps({post: Post})

</script>


<template>
        <div class="col-9">
          <div class="card bg-teal p-2 m-4">
            <div class="row">
            <div class="col-12 col-md-1">
              <img class="comment-img d-inline" :src="post?.creator.picture" alt="Michael">
            </div>
            <div class="col-10 col-sm-11 col-md-10">
              <p class="d-inline ps-2">{ post?.creator.name }</p>
              <p class="ps-2">"Days ago"</p>
            </div>
            <!-- //FIXME - Add "v-if" to delete button -->
            <div class="col-1 col-sm-1 col-md-1">
              <button class="btn btn-danger fs-5 float-end delete-post"><i class="mdi mdi-trash-can"></i></button>
            </div>
            <div class="col-12">
              <p>{ post.body }</p>
            </div>
            <div class="col-12">
              <h3 class="d-inline float-end px-3">{ post.threadId }</h3>
            </div>
          </div>
        </div>
      </div>
</template>


<style lang="scss" scoped>
.comment-img{
  height: 50px;
  width: fit-content;
  aspect-ratio: 1/1;
  border-radius: 50em;
  object-fit: cover;
  object-position: center
}

.delete-post{
  height: 45px;
  border-radius: 50em;
  aspect-ratio: 1/1;
}
</style>