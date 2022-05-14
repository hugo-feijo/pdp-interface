<template>
  <ClientOnly>
    <div :key="item.id" v-for="item in items">
      <MenuItem :item="item"/>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker'

definePageMeta({
  layout: "app-layout",
});

const items = [
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

</script>