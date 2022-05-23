<template>
  <div class="section-itens shadow-2">
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

<style lang="scss" scoped>
.section-itens {
  border-radius: 0.75rem;
  background-color: #fff;
  max-width: 600px;
}
</style>