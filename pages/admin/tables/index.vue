<template>
  <div>
    <TableDetails :table="tableOpened" @tableClosed="tableDetailsClosed()" @clientInactived="updateTables()"/>
    <DataView :value="tables" :layout="layout" :rows="9">
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: right">
              <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>
  
      <template #grid="slotProps">
        <Card 
          class="m-2" 
          :class="slotProps.data.orderPadOpened.length > 0 ? 'occupy cursor-pointer transition-all transition-duration-500 hover:shadow-8' : 'free'"
          @click="openTable(slotProps.data)">
          <template #title>

            <h1>{{slotProps.data.name }}</h1>
            
          </template>
        </Card>
      </template>
      
      <template #list="slotProps">
        <div 
          class="w-full" 
          :class="slotProps.data.orderPadOpened.length > 0 ? 'occupy cursor-pointer transition-all transition-duration-500 hover:shadow-8' : 'free'">

          <h1 class="text-center">{{slotProps.data.name }}</h1>

        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
import RestaurantUnityService from '~~/service/RestaurantUnityService';
import { useStore } from '~~/stores/main-store';

definePageMeta({
  layout: "admin-layout",
});

const config = useRuntimeConfig().public
let restaurantUnityService: RestaurantUnityService|null = null;

const mainStore = useStore();
const tables = ref()
const layout = ref('grid');
const tableOpened = ref()

onMounted(() => {
  restaurantUnityService = new RestaurantUnityService($fetch, config.SERVER_URL)
  updateTables();
})

function updateTables() {
  restaurantUnityService?.getTablesAndOpenedOrderPad(mainStore.restaurantUnityId)
    .then((response: any) => {
      tables.value=response;
    });
  tableOpened.value = null;
}

function openTable(table: any) {
  if(table?.orderPadOpened.length > 0)
    tableOpened.value = table;
}

function tableDetailsClosed() {
  tableOpened.value = null;
}
</script>


<style lang="scss">
.occupy {
  background-color: #EB455F;
  color: #ffffff;
}
</style>