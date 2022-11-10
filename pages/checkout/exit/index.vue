<template>
  <div>
    <div class="container flex flex-column align-items-center justify-content-center">
      <h3>Mostrar QR Code na saída</h3>
      <img v-if="urlExit" :src="urlExit" >
      <Button label="Sair" icon="pi pi-reply" @click="exit()"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLoading } from "vue-loading-overlay";
import { useStore } from "@/stores/main-store";

const mainStore = useStore();
const router = useRouter();
const config = useRuntimeConfig().public
const loader = useLoading({isFullPage: true, color: '#2196f3'})
const currentClient = ref({id: 0})
const urlExit = ref('')


onMounted(() => {
  let showingLoader = loader.show()
  currentClient.value = mainStore.currentClient
  const apiExit = `${config.SERVER_URL}/v1/api/client/${currentClient.value.id}/exit`
  urlExit.value = `https://chart.googleapis.com/chart?cht=qr&chl=${apiExit}&choe=UTF-8&chs=300x300`
  tableId.value = mainStore.tableId != 0 && typeof mainStore.tableId != 'undefined' ? mainStore.tableId : mainStore.tableCode
  showingLoader.hide()
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

function exit() {
  let showingLoader = loader.show()
  mainStore.currentClient = {id: 0}
  showingLoader.hide()
  router.push(`/table/${tableId.value}`)
}
</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>