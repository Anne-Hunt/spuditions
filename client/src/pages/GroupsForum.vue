<script setup>

</script>


<template>
<section class="row me-0">

<div class="col-md-2 d-none d-lg-block d-xl-block d-xxl-block">
  <nav class="sidenav">
    <section class="text-center sticky-top">
      <router-link :to="{ name: 'General Chat Forum' }">
        <div>General</div>
      </router-link>
      <router-link :to="{ name: 'Parks List' }">
        <div>Parks</div>
      </router-link>
      <router-link :to="{ name: 'Groups Forum' }">
        <div>Find Group</div>
      </router-link>
      <router-link :to="{ name: 'Equipment Forum' }">
        <div>Equipment</div>
      </router-link>
    </section>
  </nav>
</div>

<div class="col-12 d-lg-none d-xl-none d-xxl-none sticky-top pe-0">
  <nav class="topnav">
    <section class="text-center">
      <router-link :to="{ name: 'General Chat Forum' }">
        <div>General</div>
      </router-link>
      <router-link :to="{ name: 'Parks List' }">
        <div>Parks</div>
      </router-link>
      <router-link :to="{ name: 'Groups Forum' }">
        <div>Find Group</div>
      </router-link>
      <router-link :to="{ name: 'Equipment Forum' }">
        <div>Equipment</div>
      </router-link>
    </section>
  </nav>
</div>

<!-- //!SECTION - Main section of the page -->
<div class="col-12 col-md-12 col-lg-10">
      <!-- //!SECTION - Create Post button -->
      <div class="row me-0">
        <div class="col-12">
          <div class="p-3 mt-3 fw-bold">
            <h1 class="d-inline">Groups Forum</h1>
            <button class="btn btn-primary rounded text-white float-end">Create Post <i class="mdi mdi-plus"></i></button>
            <h5 class="py-3">Post your trip details or ask to join another!</h5>
          </div>
        </div>

        
        <!-- //!SECTION - Thread card -->
        <!-- //FIXME - Need to replace info with profiles and stuff -->
        <div class="col-12">
          <div class="card card-bg p-2 m-4">
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
    </div>

      <!-- //!SECTION - Leave comment button -->
      <div class="col-12">
        <button class="btn btn-primary float-end me-4">Leave Comment <i class="mdi mdi-plus"></i></button>
      </div>
    </div>    
      
      <!-- //!SECTION - Comments -->
      <!-- //FIXME - Need to v-for over these comments -->
      <div class="row me-0 justify-content-end">
        <div class="col-9">
          <div class="card card-bg p-2 m-4 collapse" id="comments">
            <div class="row">
            <div class="col-12 col-md-1">
              <img class="profile-img d-inline" src="https://www.slashfilm.com/img/gallery/michael-scotts-12-most-redeeming-moments-in-the-office/l-intro-1634858598.jpg" alt="Michael">
            </div>
            <div class="col-10 col-sm-11 col-md-10">
              <p class="d-inline ps-2">Profile Name</p>
              <p class="ps-2">"Days ago"</p>
            </div>
            <!-- //FIXME - Add "v-if" to delete button -->
            <div class="col-1 col-sm-1 col-md-1">
              <button class="btn btn-danger fs-5 float-end delete-post"><i class="mdi mdi-trash-can"></i></button>
            </div>
            <div class="col-12">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum delectus error esse ipsum nesciunt, sunt architecto! Asperiores nemo architecto ex soluta.</p>
            </div>
            <div class="col-12">
              <h3 class="d-inline float-end px-3">#Tag</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</section>
</template>


<style lang="scss" scoped>
.sidenav{
  min-height: 100vh;
  height: 100%;
  position: relative;
  background-color: #D9814F;
}

.sidenav div {
  padding: 20px 8px 20px;
  font-size: 25px;
  color: white;
  display: block;
  border-bottom: 4px solid white;
  margin-left: 6px;
  margin-right: 6px;
}

.sidenav div:hover{
  color: black;
}

.topnav{
  padding-top: 10px;
  height: 55px;
  width: 100%;
  position: relative;
  max-height: max-content;
  background-color: #D9814F;
}

.topnav div {
  padding-top: 80px;
  padding-right: 20px;
  font-size: 20px;
  color: white;
  display: inline;
}

.topnav div:hover{
  color: black;
}

.card-bg{
  background-color: #A5C9C9;
}

.profile-img{
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