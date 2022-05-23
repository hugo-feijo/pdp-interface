<template>
  <div class="pt-2 flex flex-column align-items-center flex-wrap" style="gap: 2rem">
    <MenuSection :config="foods" class="py-2"/>
    <MenuSection :config="drinks" class="py-2"/>
  </div>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker'

definePageMeta({
  layout: "app-layout",
});

const foods = {
  section: 'Hamburguers',
  items: [
    {
      id: faker.datatype.uuid(),
      name: 'Brie Burguer',
      description: faker.lorem.lines(),
      image: "/img/foods/ham01.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Catupiry com bacon',
      description: faker.lorem.lines(),
      image: "/img/foods/ham02.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Costela',
      description: faker.lorem.lines(),
      image: "/img/foods/ham03.jpg",
    }
  ]
}

const drinks = {
  section: 'Bebidas',
  items: [
    {
      id: faker.datatype.uuid(),
      name: 'Coca Cola Litro',
      description: faker.lorem.lines(),
      image: "/img/foods/coca.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Heineken Long',
      description: faker.lorem.lines(),
      image: "/img/foods/heineken.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Água 500ml',
      description: faker.lorem.lines(),
      image: "/img/foods/agua.jpg",
    }
  ]
}
</script>
<style lang="scss">
</style>