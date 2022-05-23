<template>
  <div>
    <div class="people-carousel">
      <ClientOnly>
        <div class="card">
          <Carousel 
            :value="cars" 
            :numVisible="5" 
            :numScroll="5" 
            :circular="true" 
            :autoplayInterval="3000" 
            :responsiveOptions="responsiveOptions">
            <template #item="slotProps">
              <div class="people-item">
                <div class="people-item-content">
                  <Avatar v-if="slotProps.data.avatar" :image="slotProps.data.avatar" shape="circle" size="xlarge" class="shadow-3"/>
                  <Avatar v-else icon="pi pi-user" shape="circle" size="xlarge" class="shadow-3"/>
                  <div>
                    <h4 class="mb-1">{{slotProps.data.name}}</h4>
                  </div>
                </div>
              </div>
            </template>
          </Carousel>
        </div>
      </ClientOnly>
    </div>
    <div class="flex justify-content-center animation-rotate" :class="{rotate: activeAnimation}">
      <a 
        class="button-icon"
        v-styleclass="{ selector: '.people-carousel', leaveActiveClass: 'fadeoutup', leaveToClass: 'hidden', enterClass: 'hidden', enterActiveClass: 'fadeinup' }"
        @click="activeAnimation = !activeAnimation">
        <i class="pi pi-angle-down"></i>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker'
const activeAnimation = ref(false)
const cars = ref([
  {
    name: faker.name.findName(),
    avatar: faker.image.avatar()
  },
  {
    name: faker.name.findName(),
    avatar: faker.image.avatar()
  }, 
  {
    name: faker.name.findName()
  }, 
  {
    name: faker.name.findName(),
    avatar: faker.image.avatar()
  }, 
  {
    name: faker.name.findName()
  }, 
]);
const responsiveOptions = ref([
			{
				breakpoint: '1200px',
				numVisible: 3,
				numScroll: 3
			},
			{
				breakpoint: '600px',
				numVisible: 2,
				numScroll: 2
			},
			{
				breakpoint: '480px',
				numVisible: 1,
				numScroll: 1
			}
		]);
</script>

<style lang="scss">
.people-item {
    .people-item-content {
        margin-top: .3rem;
        text-align: center;
    }

    .people-image {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
    }
}

.people-button {
  margin: 0 auto;
}

.button-icon {
  cursor: pointer;
}

.animation-rotate {
  transition: transform 0.3s ease-in-out;
}

.rotate {
  transform: rotate(180deg);
}

</style>