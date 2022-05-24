<template>
  <div class="section-itens shadow-2" v-if="config.items && config.items.length > 0">
    <h2 class="ml-4 text-2xl font-bold">{{config.section}}</h2>
    <ClientOnly>
      <div :key="item.id" v-for="item in config.items">
        <MenuItem :item="item" @item-selected="itemSelected"/>
      </div>
      
    <Dialog 
      :show-header="false" 
      v-model:visible="showModal" 
      modal 
      dismissableMask 
      contentClass="item-modal"
      :style="{'max-width': '600px'}">
      
      <div class="header-modal flex justify-content-center overflow-hidden h-10rem">
        <img class="image-modal" :src="selectedItem.image" >
      </div>
      <div class="content">
        <p>{{selectedItem.description}}</p>
      </div>
      <template #footer>
          <Button label="No" icon="pi pi-times" @click="showModal = !showModal" class="p-button-text"/>
          <Button label="Yes" icon="pi pi-check" @click="showModal = !showModal" autofocus />
      </template>
    </Dialog>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">

interface Item {
  name: string;
  description: string;
  image: string;
}
const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
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
</script>

<style lang="scss" scoped>
.section-itens {
  border-radius: 0.75rem;
  background-color: #fff;
  max-width: 600px;
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