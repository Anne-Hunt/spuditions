<script setup>

</script>


<template>
  <section class="container-fluid">
    <div class="text-center my-5 px-5">
      <h1>Our Story</h1>
      <div class="spuds text-center ms-2">
      <img class="spudLogo mt-5 me-2" src="/src/assets/img/spuditions.png" alt="spuditions logo">
      </div>
      <p>Once upon a time in the wild world of web development, there were five brave souls embarking on a quest to create a cool project. Armed with keyboards, memes, and a seemingly endless supply of caffeine, a group of students ventured forth into the treacherous jungle of HTML, CSS, JavaScript, Vue, and Express. We hope you enjoyed our project Spuditions!</p>
    </div>
    <h1 class="text-center mt-2">Meet the dev team</h1>
    <hr>
    <div class="row mt-5">

      <div class="col-12">
        <div class="row align-items-center">
          <div class="col-12 col-md-3 pt-2 text-center order-1">
            <img class="dev-img" src="/src/assets/img/jarrett.jpg" alt="Jarrett">
          </div>
          <div class="col-12 col-md-9 pb-2 order-2">
            <h1>Jarrett</h1>
            <p class="fs-5 text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt alias numquam ab! At voluptatibus sit temporibus ratione error itaque consequatur modi cum enim possimus dolore dolorem doloribus laboriosam, aliquid aut!</p>
          </div>
        </div>
      </div>
      
      <div class="col-12 ms-2">
        <div class="row align-items-center">
          <div class="col-12 col-md-9 order-2 order-md-1">
            <h1 class="text-end">Emma</h1>
            <p class="fs-5 text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt alias numquam ab! At voluptatibus sit temporibus ratione error itaque consequatur modi cum enim possimus dolore dolorem doloribus laboriosam, aliquid aut!</p>
          </div>
          <div class="col-12 col-md-3 order-1 order-md-2 text-center">
            <img class="dev-img" src="/src/assets/img/emma.jpg" alt="Emma">
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="row align-items-center">
          <div class="col-12 col-md-3 pt-2 order-1 text-center">
            <img class="dev-img" src="/src/assets/img/kyler.jpg" alt="Kyler">
          </div>
          <div class="col-12 col-md-9 pb-2 order-2">
            <h1>Kyler</h1>
            <p class="fs-5 text-start">Kyler has a background in teaching STEM, robotics, and construction management for four years. He is now transitioning into a career doing full stack development. Kyler looks forward to continue learning new things every day and furthering his career in the development world.</p>
          </div>
        </div>
      </div>

      <div class="col-12 ms-2">
        <div class="row align-items-center">
          <div class="col-12 col-md-9 order-2 order-md-1">
            <h1 class="text-end">Tara</h1>
            <p class="fs-5 text-left">Hey there! My name is Tara, and I began my passion for Graphic and Web Design at North Idaho College. I originally wanted to just pursue Graphic Design and Photography but realized I really enjoyed Web Development, so I figured why not combine them all. I am currently still on my way learning as much as I can as a Full Stack Web Developer and can't wait to get find a job in that field! </p>
          </div>
          <div class="col-12 col-md-3 order-1 order-md-2 text-center">
            <img class="dev-img" src="/src/assets/img/tara2.jpg" alt="Angela">
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="row align-items-center">
          <div class="col-12 col-md-3 pt-2 order-1 text-center">
            <img class="dev-img" src="/src/assets/img/anne.jpg" alt="Anne">
          </div>
          <div class="col-12 col-md-9 pb-2 order-2 mb-5">
            <h1>Anne</h1>
            <p class="fs-5 text-start">Anne began her career as a college English instructor teaching writing and rhetoric before tranisitoning to digital marketing in niche markets and finally full stack web development. She is constantly creating new projects and writing code. For more information please follow the links to Github or LinkedIn.</p>
          </div>
        </div>
      </div>

    </div>
    <!-- got rid of contact us since it didn't seem important -->
    <!-- <div class="text-center">
      <h1>Contact Us</h1>
      <p><i class="mdi mdi-icon"></i></p>
    </div>
    <div class="col-12 text-center">
      <p>(208) 832-2913</p>
      <p>iemail@gmail.com</p>
    </div> -->
  </section>
</template>


<style lang="scss" scoped>

.dev-img {
    height: 180px;
    width: fit-content;
    aspect-ratio: 1/1;
    border-radius: 50em;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
}

.dev-img:hover {
    transform: scale(1.05); 
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.324); 
}

.spuds{
  display: inline-block;
}


.spudLogo {
  position: relative;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 40px; 
  height: auto;
  animation: dance 2s infinite; 
}

@keyframes dance {
  0% {
    transform: translateY(-50%) rotate(0deg); /* Initial position */
  }
  10% {
    transform: translateY(-50%) rotate(5deg); /*  right */
  }
  20% {
    transform: translateY(-50%) rotate(-5deg); /* left */
  }
  30% {
    transform: translateY(-50%) rotate(3deg); /*  right */
  }
  40% {
    transform: translateY(-50%) rotate(-3deg); /*  left */
  }
  50% {
    transform: translateY(-50%) rotate(2deg); /*  right */
  }
  60% {
    transform: translateY(-50%) rotate(-2deg); /* left */
  }
  70% {
    transform: translateY(-50%) rotate(1deg); /* right */
  }
  80% {
    transform: translateY(-50%) rotate(-1deg); /* left */
  }
  90% {
    transform: translateY(-50%) rotate(0.5deg); /*  right */
  }
  100% {
    transform: translateY(-50%) rotate(0deg); /* initial position */
  }
}


</style>