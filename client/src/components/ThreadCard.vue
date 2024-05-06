<script setup>
import { Thread } from "../models/Thread.js";


defineProps({thread: Thread})

</script>


<template>
<div class="card bg-teal p-2 m-4">
            <div class="row">
              <div class="col-12 col-md-1">
                <img class="profile-img d-inline" :src="thread?.creator.name" alt="Michael">
              </div>
              <div class="col-12 col-md-11">
                <p class="d-inline">{{ thread?.creator.name }}</p>
                <p>"Days ago"</p>
              </div>
              <div class="col-12">
                <h4>{{ thread.title }}</h4>
                <p>{{ thread.body }}</p>
              </div>
              <div class="col-12">
            <button class="btn btn-white rounded-pill float-end" type="button" data-bs-toggle="collapse" data-bs-target="#comments" aria-expanded="false" aria-controls="comments"><i class="mdi mdi-comment-outline"></i> #</button>
            <h3 class="d-inline float-end px-3">#Tag</h3>
          </div>
        </div>
      </div>
</template>


<style lang="scss" scoped>
.profile-img{
  height: 50px;
  width: fit-content;
  aspect-ratio: 1/1;
  border-radius: 50em;
  object-fit: cover;
  object-position: center
}
</style>