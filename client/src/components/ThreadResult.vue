<script setup>
import { Thread } from '../models/Thread.js';


defineProps({thread: Thread})
</script>


<template>
     <RouterLink :to="{name: 'Thread Page', params: {threadId: thread.id}}">
<div>
    <div class="row overflow p-3 fontColor">
        <h3>{{ thread.title }}</h3>
        <p>{{ thread.body }}</p>
    </div>
</div>
</RouterLink> 
</template>



<style lang="scss" scoped>
.overflow{
    overflow:hidden;
    max-height: 15dvh;
}

.fontColor {
    color: var(--forestGreen);
}

.fontColor:hover {
    color: var(--lightGreen);
}
</style>