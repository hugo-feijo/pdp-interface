<template>
  <div>
    <DataTable :value="filterItems" stripedRows sortField="solicitedAt" :sortOrder="1">
  
      <Column field="solicitedAt" header="Pedido Em" sortable>
        <template #body="{data}">
          {{ formatBrDate(data.solicitedAt) }}
        </template>
      </Column>
      <Column field="item.title" header="Item" sortable></Column>
      <Column field="table" header="Mesa" sortable></Column>
      <Column field="active" header="Ação" sortable>
        <template #body="{data}">
          <Button 
            type="button" 
            label="Entregar"  
            class="p-button-danger w-full" 
            @click="finishSolicitation(data)"/>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import WebSocketService from '@/service/WebSocketService';
import { useStore } from '@/stores/main-store';
import SolicitationService from '~~/service/SolicitationService';

const mainStore = useStore();
let webSocketService : WebSocketService|null = null;
let solicitationService : SolicitationService|null = null;
const env = useRuntimeConfig().public;
const filterItems = ref()

definePageMeta({
  layout: "admin-layout",
});

onMounted(() => {
  webSocketService = new WebSocketService(env.SERVER_URL);
  solicitationService = new SolicitationService($fetch, env.SERVER_URL)
  connectToSolicitation(mainStore.restaurantUnityId)
})


function formatBrDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'});
}

function connectToSolicitation(restaurantUnityId : Number) {
  const onConnect = () => {
    webSocketService?.subscribe(`/client/${restaurantUnityId}/solicitation/update`, (result:any) => {
      sortItens(JSON.parse(result.body))
    })
    webSocketService?.sendMessage("/app/solicitation", { restaurantUnityId: restaurantUnityId });
  }

  webSocketService?.connect(onConnect);
}

function sortItens(solicitations: any) {
  console.log(solicitations)
  filterItems.value = solicitations.map((s:any) => {
    return { 
      id: s.id,
      solicitedAt: s.solicitedAt,
      table: s.orderPad.restaurantTable.name,
      item: s.items.map((i:any) => i.item)[0]
    }
  });
}

function finishSolicitation(solicitation: any) {
  console.log(solicitation)
  solicitationService.finishSolicitation(solicitation.id);
}
</script>


<style lang="scss">

</style>