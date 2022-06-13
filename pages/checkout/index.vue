<template>
  <div>
    <div class="flex justify-content-start w-full">
      <Button class="p-button-rounded p-button-secondary p-button-text p-button-lg" icon="pi pi-home" @click="goToMenuPage()"/>
    </div>
    <div class="container">
      <DataTable 
        :value="solicitations" 
        responsiveLayout="scroll" 
        stripedRows 
        v-model:expandedRows="expandedRows"
        dataKey="id">
        <Column :expander="true" headerStyle="width: 3em" />
        <Column header="Item">
          <template #body="slotProps">
            <span class="">{{slotProps.data.items[0].item.title}}</span>
          </template>
        </Column>
        <Column header="Sua parte">
          <template #body="slotProps">
            <span class="">{{money(slotProps.data.items[0].item.value / slotProps.data.clientsSolicitation.length)}} / {{slotProps.data.clientsSolicitation.length}}</span>
          </template>
        </Column>
        <template #expansion="slotProps">
          <span class="font-semibold">Clientes:</span>
          <ul>
            <li 
              :key="client.id" 
              v-for="client in slotProps.data.clientsSolicitation" class="font-light list-disc">
              {{client.client.name}} - {{money(slotProps.data.items[0].item.value / slotProps.data.clientsSolicitation.length)}}
            </li>
          </ul>
          <span>Total: {{money(slotProps.data.items[0].item.value)}}</span>
        </template>
      </DataTable>
      <div class="w-full flex justify-content-start mt-3">
        <span class="text-lg font-semibold">Total: </span>
        <span class="text-lg">{{money(total)}}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker'
const config = useRuntimeConfig().public
const router = useRouter();
const solicitations = ref()
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

onMounted(() => {
  getSolicitations()
  .then((result) => solicitations.value = parseResult(result))
})


const total = computed(() => {
  let totalValue = 0
  solicitations.value?.forEach(solicitation => {
    totalValue += solicitation.items[0].item.value / solicitation.clientsSolicitation.length
  });
  return totalValue
});

function money (value: Number) {
  return `R$${value.toFixed(2).replace('.', ',')}`
}
definePageMeta({
  layout: "app-layout",
});

function goToMenuPage() {
  router.push('/menu')
}
const currentClient = JSON.parse(localStorage.getItem('currentClient'))

async function getSolicitations() {
  return await $fetch(`${config.SERVER_URL}/v1/api/solicitation/client/${currentClient.id}`)
}

function parseResult(result) {
  return result
}
</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>