<template>
  <div>
    <div class="flex block-item h-8rem px-3 mb-4">
      <div class="flex justify-content-center image-item overflow-hidden w-6" @click="itemSelected(item)">
        <img class="h-full" :src="item.image" >
      </div>
      <ScrollPanel style="width: 100%; height: 100%">
        <p class="m-0 font-semibold text-xl">{{item.name}}</p>
        <p class="mt-0 font-semibold text-sm">{{money}}</p>
        <p>{{item.description}}</p>
      </ScrollPanel>
    </div>      
    <Dialog 
      :show-header="false" 
      v-model:visible="showModal" 
      modal 
      dismissableMask 
      contentClass="item-modal"
      :style="{'max-width': '600px', 'min-width': '70px'}">
      
      <div class="header-modal flex justify-content-center overflow-hidden h-10rem">
        <img class="image-modal" :src="selectedItem.image" >
      </div>
      <div class="content">
        <p class="font-semibold">{{money}}</p>
        <p>{{selectedItem.description}}</p>
      </div>
      <template #footer>
        <div class="flex flex-column align-items-start">
          <span>Vai dividir esse item? selecione abaixo</span>
          <PeopleHeader selectMode class="w-full"/>
        </div>
        <Button label="Cancelar" icon="pi pi-times" @click="showModal = !showModal" class="p-button-text"/>
        <Button label="Pedir" icon="pi pi-check" @click="showModal = !showModal" autofocus />
      </template>
    </Dialog>
  </div>
</template>
<script setup lang="ts">

interface Item {
  name: string;
  description: string;
  image: string;
}
const props = defineProps({
  item: {
    type: Object
  }
})

const showModal = ref(false)


const selectedItem = ref<Item>({
  name: '',
  description: '',
  image: '',
})

function itemSelected(item) {
  selectedItem.value = item
  showModal.value = true
}

const money = computed(() => {
  return `R$${props.item.value.toFixed(2).replace('.', ',')}`
})
</script>

<style lang="scss" scoped>
.block-item {
  gap: 0.5rem;
}

.image-item {
  border-radius: 0.75rem;
}

.image-modal {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content{
  padding: 0 1.5rem 2rem;
}
</style>