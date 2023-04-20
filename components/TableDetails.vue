<template>
  <div>
    <Dialog
      v-model:visible="showModal"
      maximizable 
      modal
      closable
      dismissableMask 
      :header="table?.name"
      @after-hide="afterHide()"
      :style="{ width: '50vw' }">
      <div v-for="orderPad in table?.orderPadOpened" :key="orderPad.id">
        <Panel :header="`Comanda aberta em: ${formatBrDate(orderPad.openAt)}`"> 
          <Accordion>
            <AccordionTab 
              v-for="client in orderPad.clients" :key="client.id"
              :header="client.name">
              <div class="w-full flex justify-content-end mb-3">
                <Button label="Encerrar" icon="pi pi-money-bill" severity="success" text raised rounded @click="inactiveClient(client.id, orderPad.id)"/>
              </div>
              <solicitation-resume :current-client="client"/>
            </AccordionTab>
          </Accordion>
        </Panel>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showModal = ref(false)
const emit = defineEmits(['tableClosed', 'clientInactived'])
const config = useRuntimeConfig().public

const props = defineProps({
  table: {
    type: Object
  }
})

watch(
  () => props.table,
  () => {
    if(props.table)
      showModal.value = true
  }
)

function afterHide() {
  emit('tableClosed')
}

function formatBrDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'});
}

async function inactiveClient(clientId: number, orderPadId: number) {
  await $fetch(`${config.SERVER_URL}/v1/api/client/${clientId}/inactive?orderPadId=${orderPadId}`,{method: 'PUT'});
  showModal.value = false
  emit('clientInactived')
}
</script>

<style lang="scss" scoped>
</style>