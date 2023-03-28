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
              {{ client }}
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
const emit = defineEmits(['tableClosed'])

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

function formatBrDate(date) {
  return new Date(date).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'});
}
</script>

<style lang="scss" scoped>
</style>