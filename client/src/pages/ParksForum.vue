<script setup>
import { computed, onMounted, ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import ThreadCard from "../components/ThreadCard.vue";
import { AppState } from "../AppState.js";
import ModalWrap from "../components/ModalWrap.vue";
import ThreadModal from "../components/ThreadModal.vue";
import { threadsService } from "../services/ThreadsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";

const parks = computed(()=> AppState.parks)
const account = computed(() => AppState.account)

const filterPark = ref('park')

const threads = computed(()=> {
  if(filterPark.value == 'park') return AppState.threads.filter((thread) => thread.section == 'parks')
  return AppState.threads.filter(thread => thread.tags == filterPark.value)
})
const filter = []
function filterMaker(){
  AppState.parks.forEach(park => filter.push({name: park.name, id: park.id}))
} 

// const filter = [
  // {name: 'Ashton to Tetonia Trail'},
  // {name: 'Bear Lake'},
  // {name: 'Bruneau Dunes'},
  // {name: 'Castle Rocks'},
  // {name: 'City of Rocks'},
  // {name: "Couer d'Alene Parkway"},
  // {name: "Coeur d'Alene's Old Mission"},
  // {name: "Dworshak"},
  // {name: "Eagle Island"},
  // {name: "Farragut"},
  // {name: "Harriman"},
  // {name: "Hells Gate"},
  // {name: "Henry's Lake"},
  // {name: "Heyburn"},
  // {name: "Lake Wolcott"},
  // {name: "Land of the Yankee Fork"},
  // {name: "Lucky Peak"},
  // {name: "Massacre Rocks"},
  // {name: "McCroskey"},
  // {name: "Ponderosa"},
  // {name: "Priest Lake"},
  // {name: "Round Lake"},
  // {name: "Thousand Springs"},
  // {name: "Three Island Crossing"},
  // {name: "Trail of the Coeur d'Alenes"},
  // {name: "Winchester Lake"},
  // {name: "Yellowstone"},
  // {name: "Craters of the Moon"},
  // {name: "Oregon Trail"},
  // {name: "California Trail"},
  // {name: "Lewis & Clark Trail"},
  // {name: "Nez Perce"},
  // {name: "Ice Age Floods"},
  // {name: "Hagerman Fossil Beds"},
  // {name: "Minidoka"}]
// ]
async function getThreads(){
  try {
    await threadsService.getThreads()
    filterMaker()
  } catch (error) {
    Pop.toast("Could not get threads", 'error')
    logger.error(error)
  }
}

onMounted(() => {
  getThreads()
})

</script>


<template>
  <!-- //!SECTION - Sticky sidebar -->
  <section class="row me-0">
    <Sidebar/>

    <!-- //!SECTION - Main section of the page -->
    <div class="col-12 col-md-12 col-lg-10">

      <!-- //!SECTION - Create Post button -->
      <div class="row me-0">
        <div class="col-12">
          <div class="p-3 mt-3 fw-bold">
            <h1 class="d-inline">Parks Chat</h1>
            <button v-if="!account" disabled data-bs-toggle="modal" data-bs-target="#create-thread-modal" class="btn btn-forestGreen rounded text-white float-end mt-2 ms-2">Create Thread <i class="mdi mdi-plus"></i></button>
            <button v-else data-bs-toggle="modal" data-bs-target="#create-thread-modal" class="btn btn-forestGreen rounded text-white float-end mb-2">Create Thread <i class="mdi mdi-plus"></i></button>
            <ModalWrap modalId="create-thread-modal">
              <ThreadModal/>
            </ModalWrap>
            <form>
        <div class="">
          <label class="p-2" for="parkChoose">Choose a Park:</label>
          <select name="parkChoose" v-model="filterPark" id="parksList" class="rounded">
            <option @change="filterPark = park.name" v-for="park in parks" :key="park.name" :value="park.name">{{ park.name }}</option>
          </select>
        </div>
      </form>
      <div class="p-2 ">
            <h5 class="py-3">Explore park discussions, from general chatter to specific spots – pick your park above!</h5>
            </div>
          </div>
        </div>

        <!-- //!SECTION - Thread card -->
        <div v-for="thread in threads" :key="thread?.id" class="col-12">
          <router-link :to="{ name: 'Thread Page', params: {threadId: thread.id}}">
            <ThreadCard :thread="thread"/>
          </router-link>
          </div>
      </div>
      <!-- <span v-for="park in parks" :key="park.id">{{ park.name }}</span> -->
  </div>
  <ForumRules/>
  </section>
</template>


<style lang="scss" scoped>

.btn.btn-forestGreen:hover {
  background-color: var(--lightGreen);
    }

</style>