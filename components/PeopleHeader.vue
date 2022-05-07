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
                  <Avatar icon="pi pi-user" shape="circle" size="xlarge" class="shadow-3"/>
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
    <div class="flex justify-content-center">
      <a 
        class="button-icon"
        v-styleclass="{ selector: '.people-carousel', leaveActiveClass: 'fadeoutup', leaveToClass: 'hidden', enterClass: 'hidden', enterActiveClass: 'fadeinup' }">
        <i class="pi pi-angle-down"></i>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
const cars = ref([{name: 'Teste'}, {name: 'Teste2'}, {name: 'Teste3'}, {name: 'Teste4'}, {name: 'Teste5'}]);
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
</style>