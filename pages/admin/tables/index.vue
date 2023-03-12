<template>
  <div class="container w-12">
    <DataView :value="tables" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
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
				<Card class="m-2 table-card" :class="Math.random() < 0.5 ? 'occupy' : 'free'">
          <template #title>
            <h1>
              {{slotProps.data.idRestaurantTable }}
            </h1>
          </template>
				</Card>
			</template>
      
      <template #list="slotProps">
        <div class="w-full" :class="Math.random() < 0.5 ? 'occupy' : 'free'">
          <h1 class="text-center">
            {{slotProps.data.idRestaurantTable }}
          </h1>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
});

const tables = ref([{dataKey: 0, idRestaurantTable: '01'},
{dataKey: 1, idRestaurantTable: '02'},
{dataKey: 2, idRestaurantTable: '03'},
{dataKey: 3, idRestaurantTable: '04'},
{dataKey: 4, idRestaurantTable: '05'},
{dataKey: 5, idRestaurantTable: '06'}])

const layout = ref('grid');
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
    {label: 'Price High to Low', value: '!price'},
    {label: 'Price Low to High', value: 'price'},
]);

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
.table-card {
  // max-height: 100px;
}
</style>