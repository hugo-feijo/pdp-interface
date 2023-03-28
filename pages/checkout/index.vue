<template>
  <div>
    <div class="flex justify-content-start w-full">
      <Button class="p-button-rounded p-button-secondary p-button-text p-button-lg" icon="pi pi-home" @click="goToMenuPage()"/>
    </div>
    <solicitation-resume :current-client="currentClient"/>
    <div class="container">
      <div class="mx-2">
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
const toast = useToast();
const currentClient = ref({id: 0})

function goToMenuPage() {
  router.push('/menu')
}

onMounted(() => {
  currentClient.value = mainStore.currentClient
  tableId.value = mainStore.tableId != 0 && typeof mainStore.tableId != 'undefined' ? mainStore.tableId : mainStore.tableCode
})

definePageMeta({
  layout: "app-layout",
});

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