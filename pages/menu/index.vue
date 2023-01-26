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
    <div v-for="category in filterItems" :key="category.name" class="w-full flex justify-content-center">
      <MenuSection :config="category" class="py-2"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLoading } from 'vue-loading-overlay';
import { useStore } from '@/stores/main-store';

const mainStore = useStore();
const router = useRouter();
const env = useRuntimeConfig().public
const loader = useLoading({isFullPage: true, color: '#2196f3'})

definePageMeta({
  layout: "app-layout",
});

const menu = ref()

onMounted(() => {
  let showingLoader = loader.show()
  getMenu()
  .then((result: any) => {
    showingLoader.hide()
    menu.value = result
  })
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
      items: base.items.filter(food => food.title.toLowerCase().includes(searchText.value.toLowerCase())).sort((x:any,y:any) => sortAlphabetical(x.title, y.title))
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
</script>
<style lang="scss">
</style>