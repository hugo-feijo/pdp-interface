<template>
  <div class="pt-2 flex flex-column align-items-center flex-wrap" style="gap: 2rem">
    <div class="flex w-full">
      <div class="flex-none flex align-items-center justify-content-center">
        <Button class="p-button-rounded p-button-secondary p-button-text p-button-lg" icon="pi pi-home"/>
      </div>
      <div class="flex-grow-1 flex align-items-center justify-content-center">
        <span class="p-input-icon-right p-float-label">
          <InputText id="search" type="text" v-model="searchText"/>
          <label for="search">Pesquisar</label>
          <i class="pi pi-search"/>
        </span>
      </div>
      <div class="flex-none flex align-items-center justify-content-center">
        <Button class="p-button-rounded p-button-secondary p-button-text p-button-lg" icon="pi pi-shopping-cart" @click="goToCheckout()"/>
      </div>
    </div>
    <MenuSection :config="foods" class="py-2"/>
    <MenuSection :config="drinks" class="py-2"/>
  </div>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker'
const router = useRouter();

definePageMeta({
  layout: "app-layout",
});

const searchText = ref('')

const baseFoods = ref({
  section: 'Hamburguers',
  items: [
    {
      id: faker.datatype.uuid(),
      name: 'Brie Burguer',
      value: 23.94,
      description: faker.lorem.lines(),
      image: "/img/foods/ham01.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Catupiry com bacon',
      value: 25.73,
      description: faker.lorem.lines(),
      image: "/img/foods/ham02.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Costela',
      value: 29.80,
      description: faker.lorem.lines(),
      image: "/img/foods/ham03.jpg",
    }
  ]
})

const baseDrinks = ref({
  section: 'Bebidas',
  items: [
    {
      id: faker.datatype.uuid(),
      name: 'Coca Cola Litro',
      value: 9.90,
      description: faker.lorem.lines(),
      image: "/img/foods/coca.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Heineken Long',
      value: 7.50,
      description: faker.lorem.lines(),
      image: "/img/foods/heineken.jpg",
    },
    {
      id: faker.datatype.uuid(),
      name: 'Água 500ml',
      value: 3.50,
      description: faker.lorem.lines(),
      image: "/img/foods/agua.jpg",
    }
  ]
})

const foods = computed(() => {
  return {
    section: baseFoods.value.section, 
    items: baseFoods.value.items.filter(food => {
      return food.name.toLowerCase().includes(searchText.value.toLowerCase())
    })
  }
})
const drinks = computed(() => {
  return {
    section: baseDrinks.value.section, 
    items: baseDrinks.value.items.filter(drink => {
      return drink.name.toLowerCase().includes(searchText.value.toLowerCase())
    })
  }
})

function goToCheckout() {
  router.push('/checkout')
}
</script>
<style lang="scss">
</style>