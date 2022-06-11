<template>
  <div class="pt-2 flex flex-column align-items-center flex-wrap" style="gap: 2rem">
    <div class="flex w-full">
      <div class="flex-none flex align-items-center justify-content-center">
        <Button class="p-button-rounded p-button-secondary p-button-text p-button-lg" icon="pi pi-home"/>
      </div>
      <div class="flex-grow-1 flex align-items-center justify-content-center">
        <span class="p-input-icon-right p-float-label">
          <InputText id="search" type="text" v-model="searchText"/>
          <label for="search">Pesquisar</label>
          <i class="pi pi-search"/>
        </span>
      </div>
      <div class="flex-none flex align-items-center justify-content-center">
        <Button class="p-button-rounded p-button-secondary p-button-text p-button-lg" icon="pi pi-shopping-cart" @click="goToCheckout()"/>
      </div>
    </div>
    <div v-for="category in filterItems" :key="category.name">
      <MenuSection :config="category" class="py-2"/>
    </div>
  </div>
</template>
<script setup lang="ts">


const router = useRouter();
const env = useRuntimeConfig().public

definePageMeta({
  layout: "app-layout",
});

const menu = ref()

onMounted(() => 
  getMenu()
  .then((result: any) => {
    console.log(result)
    menu.value = result
  })
)

async function getMenu() {
  return await $fetch(`${env.SERVER_URL}/v1/api/menu/restaurant-unity/${localStorage.getItem('restaurantUnityId')}`)
}


const searchText = ref('')

const filterItems = computed(() => {
  return menu.value?.categories
  .map((base) => {
    return {
      name: base.name, 
      items: base.items.filter(food => food.title.toLowerCase().includes(searchText.value.toLowerCase()))
    }
  })
})

function goToCheckout() {
  router.push('/checkout')
}
</script>
<style lang="scss">
</style>