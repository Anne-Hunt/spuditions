<script setup>
import { Post } from '../models/Post.js';



defineProps({post: Post})
</script>


<template>
<div>
    <div class="col-md-6 col-10 overflow p-3">
        <h5>{{ post.creator.name }}</h5>
        <p>{{ post.body }}</p>
    </div>
</div>
</template>


<style lang="scss" scoped>
.overflow{
    overflow:hidden;
    max-height: 10dvh;
}
</style>