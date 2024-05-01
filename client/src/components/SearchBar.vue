<script setup>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";

const searchQuery = ref('')

const searchTerm = computed(() => AppState.searchTerm)

</script>

<!-- //FIXME - This is just a static form rn, still need to add functionality -->
<template>
  <form>
    <div class="input-group">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="search..." id="search-input">
      <button class="btn btn-success w-25"><i class="mdi mdi-magnify"></i></button>
    </div>
  </form>
</template>


<style lang="scss" scoped>

</style>