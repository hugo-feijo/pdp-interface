<template>
  <div class="fixed top-0 left-0 w-full z-5">
    <ClientOnly>
      <TabMenu :model="items" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">

const items = [
  {label: 'Cardapios', icon: 'pi pi-fw pi-file', to: '/admin/cardapios'},
  {label: 'Mesas', icon: 'pi pi-fw pi-table', to: '/admin/tables'},
  {label: 'Pedidos', icon: 'pi pi-fw pi-clock', disabled: true}]

</script>


<style lang="scss">

</style>