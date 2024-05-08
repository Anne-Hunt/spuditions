<script setup>
import { computed } from "vue";
import { Thread } from "../models/Thread.js";
import { AppState } from "../AppState.js";


defineProps({thread: Thread, fullView: {type: Boolean, default: false}})

const account = computed(() => AppState.account)

</script>


<template>
    <div v-if="thread" class="card bg-teal p-2 m-4 my-2 pb-0">
        <div class="row py-2">
            <div class="px-4 col-12 d-flex">
                <div>
                    <img class="mt-1 profile-img d-inline" :src="thread?.creator.picture" alt="Michael">
                </div>
                <div class="pe-5 ps-3 w-100">
                    <span class="fw-bold fs-5"><span v-for="tag in thread?.tags" :key="tag" class="bg-forestGreen rounded px-3 text-white fw-light fs-6 py-1 me-2">{{ tag }}</span> {{ thread?.title }}</span>
                    <p class="w-100" :class="{ 'noWrap' : !fullView }">{{ thread?.body }}</p>
                </div>
            </div>
            <div v-if="thread?.creatorId == account.id" class="col-12 col-sm-12 col-md-12">
                <button class="btn btn-danger fs-5 float-end delete-post"><i class="mdi mdi-trash-can"></i></button>
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