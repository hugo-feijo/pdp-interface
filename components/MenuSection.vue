<template>
  <div>
    <h2 class="ml-4 text-2xl font-bold">{{config.section}}</h2>
    <ClientOnly>
      <div :key="item.id" v-for="item in config.items">
        <MenuItem :item="item"/>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
})
</script>