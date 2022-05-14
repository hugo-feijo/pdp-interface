<template>
  <div class="flex block-item h-8rem px-3 mb-4">
    <div class="flex justify-content-center image-item overflow-hidden w-6">
      <img class="h-full" :src="item.image" >
    </div>
    <div class="w-full h-full overflow-scroll">
      <h3 class="mt-0">{{item.name}}</h3>
      <div class="">
        <p>{{item.description}}</p>
      </div>
    </div>
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