<template>
  <div class="menu-sections pt-2">
    <MenuSection :config="foods" class="shadow-2 py-2 card-section mb-5"/>
    <MenuSection :config="drinks" class="shadow-2 py-2 card-section mb-5"/>
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
      image: "/assets/img/foods/ham01.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Catupiry com bacon',
      description: faker.lorem.lines(),
      image: "/assets/img/foods/ham02.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Costela',
      description: faker.lorem.lines(),
      image: "/assets/img/foods/ham03.jpg",
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
      image: "/assets/img/foods/coca.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Heineken Long',
      description: faker.lorem.lines(),
      image: "/assets/img/foods/heineken.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Água 500ml',
      description: faker.lorem.lines(),
      image: "/assets/img/foods/agua.jpg",
    }
  ]
}
</script>
<style lang="scss">
body {
  background-color: rgb(250, 254, 255);
}
.card-section {
  border-radius: 0.75rem;
  background-color: #fff;
}
</style>