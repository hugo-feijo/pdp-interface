<template>
  <div class="fixed top-0 left-0 w-full">
    <ClientOnly>
      <TabMenu :model="items" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">

const items = [
  {label: 'Comandas', icon: 'pi pi-fw pi-file', to: '/admin/comandas'},
  {label: 'Mesas', icon: 'pi pi-fw pi-table', disabled: true},
  {label: 'Pedidos', icon: 'pi pi-fw pi-clock', disabled: true}]

</script>


<style lang="scss">

</style>