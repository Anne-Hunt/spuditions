<script setup>

</script>


<template>
<div class="card bg-teal p-2 m-4">
            <div class="row">
              <div class="col-12 col-md-1">
                <img class="profile-img d-inline" src="https://www.slashfilm.com/img/gallery/michael-scotts-12-most-redeeming-moments-in-the-office/l-intro-1634858598.jpg" alt="Michael">
              </div>
              <div class="col-12 col-md-11">
                <p class="d-inline">Profile Name</p>
                <p>"Days ago"</p>
              </div>
              <div class="col-12">
                <h4>Thread title</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum delectus error esse ipsum nesciunt, sunt architecto! Asperiores nemo architecto ex soluta rem deleniti, placeat iste facilis, eveniet, omnis eligendi repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore molestias recusandae consequuntur, iste dignissimos provident praesentium aperiam accusamus doloremque, nesciunt maiores! Placeat cupiditate enim quas consequatur quibusdam labore facilis laborum!</p>
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