<template>
  <div class="flex flex-wrap gap-3 w-full justify-content-center align-content-center">
    <div v-for="menu in menus" :key="menu.id">
      <MenuCard :menu="menu"/>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
});
const menus = [{id:0, title: "Cardapio principal", description: "Teste"}, {id:0, title: "Cardapio principal", description: "Teste"}, {id:0, title: "Cardapio principal", description: "Teste"}, {id:0, title: "Cardapio principal", description: "Teste"}, {id:0, title: "Cardapio principal", description: "Teste"}]
</script>


<style lang="scss">

</style>