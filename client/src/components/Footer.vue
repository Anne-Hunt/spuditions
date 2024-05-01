<script setup>

</script>


<template>
<footer class="container-flex">
<div class="row bkcolor text-light align-items-center py-2 px-5 w-100 m-0">
    <div class="col-3">
        <h5>Connect</h5>
        <a href="/Forums" class="footlink">Forums</a><br>
        <a href="/Search" class="footlink">Search</a><br>
        <a href="/About" class="footlink">Contact Us</a>
    </div>
    <div class="col-3">
        <h5>Resources</h5>
        <a class="footlink" href="https://www.nps.gov/index.htm">National Parks Service</a><br>
        <a class="footlink" href="https://parksandrecreation.idaho.gov/">Idaho State Parks</a><br>
        <a class="footlink" href="https://parksandrecreation.idaho.gov/activities/camping-tents/">Idaho Campgrounds</a>
    </div>
    <div class="col-6 d-flex justify-content-center">
        <img src="src/assets/img/spudition logo.png" alt="Spuditions" class="logo">
    </div>
    </div>
</footer>
</template>


<style lang="scss" scoped>
.bkcolor{
    background-color: var(--forestGreen);
}
.beige{
    color: var(--beigeSand);
}
.logo{
    max-height: 45px;
}

.footlink{
    color: white;
    font-weight: bold;
    font-size:small;
}
</style>