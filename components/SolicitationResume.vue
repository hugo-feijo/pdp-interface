<template>
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
    <div class="mx-2">
      <div class="w-full flex justify-content-start mt-3">
        <span class="text-lg font-semibold">Total: </span>
        <span class="text-lg">{{money(total)}}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SolicitationService from "~~/service/SolicitationService";

let solicitationService: SolicitationService|null = null;
const config = useRuntimeConfig().public
const solicitations = ref()
const expandedRows = ref([])
const props = defineProps({
  currentClient: {
    type: Object
  }
})

onMounted(() => {
  solicitationService = new SolicitationService($fetch, config.SERVER_URL)
  solicitationService.getSolicitation(props.currentClient?.id)
  .then((result) => {
    solicitations.value = result
  })
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

</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>