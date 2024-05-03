<script setup>
import { Thread } from '../models/Thread.js';


defineProps({thread: Thread})
</script>


<template>
<div>
    <div class="row overflow p-3">
        <h3>{{ thread.title }}</h3>
        <p>{{ thread.body }}</p>
    </div>
</div>
</template>


<style lang="scss" scoped>
.overflow{
    overflow:hidden;
    max-height: 15dvh;
}
</style>