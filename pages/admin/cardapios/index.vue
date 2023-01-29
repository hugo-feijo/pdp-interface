<template>
  <div class="flex flex-wrap gap-3 w-full justify-content-center align-content-center">
    <ClientOnly>
      <DataTable :value="filterItems" stripedRows sortField="title" :sortOrder="1">

        <Column field="categoryName" header="Categoria" sortable></Column>
        <Column field="title" header="Item" sortable></Column>
        <Column field="value" header="Valor" sortable>
          <template #body="slotProps">
            <span>R${{slotProps.data.value.toFixed(2).replace('.', ',')}}</span>
          </template>
        </Column>
        <Column field="active" header="Status" sortable>
          <template #body="{data}">
            <Button 
              type="button" 
              :label="data.active ? 'Ativado' : 'Desativado'"  
              :class="data.active ? 'p-button-success' : 'p-button-danger'" 
              class="w-full" 
              @click="updateItemStatus(data.id)"/>
          </template>
        </Column>
      </DataTable>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from 'vue-loading-overlay';
import { useStore } from '@/stores/main-store';

const mainStore = useStore();
const env = useRuntimeConfig().public
const loader = useLoading({isFullPage: true, color: '#2196f3'})

definePageMeta({
  layout: "admin-layout",
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

const filterItems = computed(() => {
  return extractItems(menu.value?.categories)
})

function extractItems(categories : any) {
  console.log(categories)
  let items : any = [];
  categories?.forEach(category => {
      items = items.concat(category.items);
  });
  return items;
}

async function updateItemStatus(id : Number) {
  let showingLoader = loader.show()
  await $fetch(`${env.SERVER_URL}/v1/api/item/status/${id}`, {method: 'PUT', headers: {'x-restaurant-unity-id': "1"}})
  getMenu()
  .then((result: any) => {
    showingLoader.hide()
    menu.value = result
  })
}
</script>


<style lang="scss">

</style>