<template>
  <div class="flex block-item h-8rem px-3 mb-4">
    <div class="flex justify-content-center image-item overflow-hidden w-6" @click="$emit('itemSelected', item)">
      <img class="h-full" :src="item.image" >
    </div>
    <ScrollPanel style="width: 100%; height: 100%">
      <p class="mt-0 font-semibold text-xl">{{item.name}}</p>
      <p>{{item.description}}</p>
    </ScrollPanel>
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  item: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
.block-item {
  gap: 0.5rem;
}

.image-item {
  border-radius: 0.75rem;
}
</style>