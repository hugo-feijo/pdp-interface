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
import WebSocketService from '@/service/WebSocketService';

const mainStore = useStore();
const env = useRuntimeConfig().public
const loader = useLoading({isFullPage: true, color: '#2196f3'})
let webSocketService : WebSocketService|null = null;

definePageMeta({
  layout: "admin-layout",
});

const menu = ref()

onMounted(() => {
  webSocketService = new WebSocketService(env.SERVER_URL);
  connectToMenu();
})

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
  await $fetch(`${env.SERVER_URL}/v1/api/item/status/${id}`, {method: 'PUT', headers: {'x-restaurant-unity-id': "1"}})
}
</script>


<style lang="scss">

</style>