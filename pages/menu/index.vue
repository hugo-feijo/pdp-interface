<template>
  <div class="pt-2 flex flex-column align-items-center flex-wrap" style="gap: 2rem">
    <div class="flex w-full">
      <div class="flex-none flex align-items-center justify-content-center">
        <Button 
          class="p-button-rounded p-button-secondary p-button-text p-button-lg" 
          icon="pi pi-home"
          style="visibility: hidden"/>
      </div>
      <div class="flex-grow-1 flex align-items-center justify-content-center">
        <span class="p-input-icon-right p-float-label">
          <InputText id="search" type="text" v-model="searchText"/>
          <label for="search">Pesquisar</label>
          <i class="pi pi-search"/>
        </span>
      </div>
      <div class="flex-none flex align-items-center justify-content-center">
        <Button class="p-button-rounded p-button-secondary p-button-text p-button-lg" icon="pi pi-sign-out" @click="goToCheckout()"/>
      </div>
    </div>

    <div v-if="!filterItems" class="w-full flex flex-row justify-content-center gap-3 flex-wrap">
      <Skeleton class="menu-section-skeleton" height="20rem" borderRadius="0.75rem"/>
      <Skeleton class="menu-section-skeleton" height="20rem" borderRadius="0.75rem"/>
    </div>
    <div v-else v-for="category in filterItems" :key="category.name" class="w-full flex justify-content-center">
      <MenuSection :config="category" class="py-2"/>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { useLoading } from 'vue-loading-overlay';
import { useStore } from '@/stores/main-store';
import WebSocketService from '@/service/WebSocketService';


const mainStore = useStore();
const router = useRouter();
const env = useRuntimeConfig().public;
// const loader = useLoading({isFullPage: true, color: '#2196f3'});
let webSocketService : WebSocketService|null = null;

definePageMeta({
  layout: "app-layout",
});

const menu = ref()

onMounted(() => {
  webSocketService = new WebSocketService(env.SERVER_URL);
  connectToMenu();
})

async function getMenu() {
  return await $fetch(`${env.SERVER_URL}/v1/api/menu/restaurant-unity/${mainStore.restaurantUnityId}`)
}

const searchText = ref('')

const filterItems = computed(() => {
  return menu.value?.categories
  .map((base) => {
    return {
      name: base.name, 
      items: base.items.filter(food => food.title.toLowerCase().includes(searchText.value.toLowerCase()) && food.active).sort((x:any,y:any) => sortAlphabetical(x.title, y.title))
    }
  }).sort((x:any,y:any) => sortAlphabetical(x.name, y.name))
})

function goToCheckout() {
  router.push('/checkout')
}


function sortAlphabetical(x : String, y : String) {
  let a = x.toUpperCase(),
      b = y.toUpperCase();
  return a == b ? 0 : a > b ? 1 : -1;
}

function connectToMenu() {
  // let showingLoader = loader.show()
  const onConnect = () => {
    webSocketService?.subscribe(`/restaurant-unity/${mainStore.restaurantUnityId}/update`, (result:any) => {
      menu.value = JSON.parse(result.body);
      // showingLoader.hide()
    })
    webSocketService?.sendMessage("/app/menu", { restaurantUnityId: mainStore.restaurantUnityId });
  }

  webSocketService?.connect(onConnect);
}

</script>
<style lang="scss">
.menu-section-skeleton {
  max-width: 600px;
}
</style>