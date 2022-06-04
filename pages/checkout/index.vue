<template>
  <div>
    <div class="flex justify-content-start w-full">
      <Button class="p-button-rounded p-button-secondary p-button-text p-button-lg" icon="pi pi-home" @click="goToMenuPage()"/>
    </div>
    <div class="container">
      <DataTable 
        :value="baseFoods" 
        responsiveLayout="scroll" 
        stripedRows 
        v-model:expandedRows="expandedRows"
        dataKey="id">
        <Column :expander="true" headerStyle="width: 3em" />
        <Column field="name" header="Item"/>
        <Column field="value" header="Valor Final">
          <template #body="slotProps">
              {{money(slotProps.data.value)}}
          </template>
        </Column>
        <template #expansion="slotProps">
          <h1>{{slotProps.data.name}}</h1>
        </template>
      </DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker'
const router = useRouter();
const baseFoods = ref([
  {
    id: faker.datatype.uuid(),
    name: 'Brie Burguer',
    value: 23.94,
    description: faker.lorem.lines(),
    image: "/img/foods/ham01.jpg",
  },
  {
    id: faker.datatype.uuid(),
    name: 'Catupiry com bacon',
    value: 25.73,
    description: faker.lorem.lines(),
    image: "/img/foods/ham02.jpg",
  },
  {
    id: faker.datatype.uuid(),
    name: 'Costela',
    value: 29.80,
    description: faker.lorem.lines(),
    image: "/img/foods/ham03.jpg",
  }
])

const expandedRows = ref([])

function money (value: Number) {
  return `R$${value.toFixed(2).replace('.', ',')}`
}
definePageMeta({
  layout: "app-layout",
});

function goToMenuPage() {
  router.push('/menu')
}

</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>