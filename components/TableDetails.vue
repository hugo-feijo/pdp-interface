<template>
  <div>
    <Dialog 
      v-model:visible="showModal"
      maximizable 
      modal
      closable
      dismissableMask 
      :header="table?.name"
      @after-hide="afterHide()">
      {{ table }}
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
</script>

<style lang="scss" scoped>
</style>