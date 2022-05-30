<template>
  <div>
    <div class="flex block-item h-8rem px-3 mb-4">
      <div class="flex justify-content-center image-item overflow-hidden w-6" @click="itemSelected(item)">
        <img class="h-full" :src="item.image" >
      </div>
      <ScrollPanel style="width: 100%; height: 100%">
        <p class="mt-0 font-semibold text-xl">{{item.name}}</p>
        <p>{{item.description}}</p>
      </ScrollPanel>
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
        <PeopleHeader />
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