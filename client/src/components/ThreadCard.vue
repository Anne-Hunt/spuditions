<script setup>

defineProps({ fullView: { type: Boolean, default: false } })

</script>


<template>
    <div class="card bg-teal p-2 m-4 pb-0">
        <div class="row py-2">
            <div class="px-4 col-12 d-flex">
                <div>
                    <img class="mt-1 profile-img d-inline" src="https://www.slashfilm.com/img/gallery/michael-scotts-12-most-redeeming-moments-in-the-office/l-intro-1634858598.jpg" alt="Michael">
                </div>
                <div class="pe-5 ps-3 w-100">
                    <span class="fw-bold fs-5"><span class="bg-forestGreen rounded px-3 text-white fw-light fs-6 py-1 me-2">Tag</span> Thread title</span>
                    <p class="w-100" :class="{ 'noWrap' : !fullView }">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum delectus error esse ipsum nesciunt, sunt architecto! Asperiores nemo architecto ex soluta rem deleniti, placeat iste facilis, eveniet, omnis eligendi repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore molestias recusandae consequuntur, iste dignissimos provident praesentium aperiam accusamus doloremque, nesciunt maiores! Placeat cupiditate enim quas consequatur quibusdam labore facilis laborum!</p>
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