<script setup>

</script>


<template>
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
</style>