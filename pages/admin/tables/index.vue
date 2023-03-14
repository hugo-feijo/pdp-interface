<template>
  <div class="container w-12">
    <DataView :value="tables2" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
			<template #header>
        <div class="grid grid-nogutter">
            <div class="col-6" style="text-align: left">
                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
            </div>
            <div class="col-6" style="text-align: right">
                <DataViewLayoutOptions v-model="layout" />
            </div>
        </div>
			</template>

      <template #grid="slotProps">
				<Card class="m-2 table-card" :class="slotProps.data.orderPadOpened.length > 0 ? 'occupy' : 'free'">
          <template #title>
            <h1>
              {{slotProps.data.name }}
            </h1>
          </template>
				</Card>
			</template>
      
      <template #list="slotProps">
        <div class="w-full" :class="slotProps.data.orderPadOpened.length > 0 ? 'occupy' : 'free'">
          <h1 class="text-center">
            {{slotProps.data.name }}
          </h1>
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
const tables2 = ref()
const layout = ref('grid');
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
    {label: 'Price High to Low', value: '!price'},
    {label: 'Price Low to High', value: 'price'},
]);

onMounted(() => {
  restaurantUnityService = new RestaurantUnityService($fetch, config.SERVER_URL)
  restaurantUnityService.getTablesAndOpenedOrderPad(mainStore.restaurantUnityId)
  .then((response:any) => {
    tables2.value = response;
  })
})

function onSortChange (event) {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    }
    else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};
</script>


<style lang="scss">
.occupy {
  background-color: #EB455F;
}
</style>