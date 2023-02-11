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
      <div class="mx-2">
        <div class="w-full flex justify-content-start mt-3">
          <span class="text-lg font-semibold">Total: </span>
          <span class="text-lg">{{money(total)}}</span>
        </div>
        <div class="flex justify-content-end gap-3">
          <Button label="Pagar online" icon="pi pi-wallet" @click="payment()"/>
          <Button label="Pagar no caixa" icon="pi pi-reply" @click="checkout()"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useStore } from "@/stores/main-store";

const mainStore = useStore();
const config = useRuntimeConfig().public
const router = useRouter();
const solicitations = ref()
const toast = useToast();
const expandedRows = ref([])

function goToMenuPage() {
  router.push('/menu')
}

onMounted(() => {
  currentClient.value = mainStore.currentClient
  tableId.value = mainStore.tableId != 0 && typeof mainStore.tableId != 'undefined' ? mainStore.tableId : mainStore.tableCode
  getSolicitations()
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
definePageMeta({
  layout: "app-layout",
});
const currentClient = ref({id: 0})

async function getSolicitations() {
  return await $fetch(`${config.SERVER_URL}/v1/api/solicitation/client/${currentClient.value.id}`)
}

const tableId = ref()
mainStore.$subscribe((_, state) => {
  if(state.tableId != 0 && typeof state.tableId != 'undefined')
    tableId.value = state.tableId

  if(state.tableCode != '' && typeof state.tableCode != 'undefined')
    tableId.value = state.tableCode
})

function payment() {
  router.push(`/checkout/payment`)
}

function checkout() {
  inactiveClient()
  .then(() => {
    toast.add({severity:'success', summary: 'Sucesso', detail:'Conta paga!!', life: 3000});
    router.push(`/checkout/exit`)
  })
}

async function inactiveClient() {
  return await $fetch(`${config.SERVER_URL}/v1/api/client/${currentClient.value.id}/inactive?orderPadId=${mainStore.orderPadId}`,{method: 'PUT'})
}
</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>