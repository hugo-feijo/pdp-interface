<template>
  <Card class="w-full cursor-pointer">
    <template #title>
      {{ menu.title }}
    </template>
    <template #content>
        <p>{{ menu.description }}</p>
    </template>
  </Card>
</template>
<script setup lang="ts">
const props = defineProps({
  menu: {
    type: Object
  }
})
</script>