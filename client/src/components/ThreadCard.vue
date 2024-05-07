<script setup>
import { Thread } from "../models/Thread.js";


defineProps({thread: Thread, fullView: {type: Boolean, default: false}})

</script>


<template>
    <div v-if="thread" class="card bg-teal p-2 m-4 my-2 pb-0">
        <div class="row py-2">
            <div class="px-4 col-12 d-flex">
                <div>
                    <img class="mt-1 profile-img d-inline" :src="thread.creator.picture" alt="Michael">
                </div>
                <div class="pe-5 ps-3 w-100">
                    <span class="fw-bold fs-5"><span v-for="tag in thread.tags" :key="tag" class="bg-forestGreen rounded px-3 text-white fw-light fs-6 py-1 me-2">{{ tag }}</span> {{ thread.title }}</span>
                    <p class="w-100" :class="{ 'noWrap' : !fullView }">{{ thread.body }}</p>
                </div>
            </div>
            <div class="col-12">

            </div>
        </div>
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