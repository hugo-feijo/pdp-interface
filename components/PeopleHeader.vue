<template>
  <div>
    <div class="people-carousel">
      <ClientOnly>
        <div class="card">
          <Carousel 
            v-if="clients?.length > 0"
            :value="clients" 
            :numVisible="5" 
            :numScroll="5" 
            :circular="true" 
            :autoplayInterval="3000" 
            :responsiveOptions="selectMode ? responsiveOptionsSelectedMode : responsiveOptions">
            <template #item="slotProps">
              <div class="people-item">
                <div class="people-item-content" @click="selectPeople(slotProps.data)">
                  <Avatar 
                    :image="slotProps.data.avatar" 
                    shape="circle" 
                    size="xlarge"
                    :class="selectMode && !slotProps.data.selected ? 'gray' : 'shadow-5'"/>
                  <div>
                    <h4 class="mb-1" v-if="!selectMode">{{slotProps.data.name}}</h4>
                    <span class="mb-0" v-else>{{slotProps.data.name}}</span>
                  </div>
                </div>
              </div>
            </template>
          </Carousel>
          <span v-else-if="clients?.length == 0" class="w-full flex justify-content-center">Somente você na mesa.</span>
          <span v-else class="w-full flex justify-content-center">Nenhum cliente na mesa ainda.</span>
        </div>
      </ClientOnly>
    </div>
    <div class="flex justify-content-center animation-rotate" :class="{rotate: activeAnimation}" v-if="!selectMode">
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
const config = useRuntimeConfig().public
const route = useRoute()
const emit = defineEmits(['clientsSelected'])
const props = defineProps({
  selectMode: {
    type: Boolean,
    default: false,
  }
})

const activeAnimation = ref(false)
const currentClient = ref({id: 0})
const clients = ref()

interface OriginalClient {
  id: Number,
  name: String,
  cpf: String
}

function parseClients(originalClients: OriginalClient[]) {
  return originalClients.map(x => {
    return {
      id: x.id,
      name: x.name,
      avatar: `https://avatars.dicebear.com/api/initials/${x.name}.svg?radius=50`,
      selected: false
    }
  })
}

const timer = ref()

async function getOrderPad() {
  return await $fetch(`${config.SERVER_URL}/v1/api/order-pad/open?tableId=${localStorage.getItem('tableId')}`, {method: 'POST'})
}

function fetchClients() {
  getOrderPad()
  .then((r: any) => {
    localStorage.setItem('orderPadId', r.id)
    localStorage.setItem('restaurantUnityId', r.restaurantTable.restaurantUnity.id)
    localStorage.setItem('clients', JSON.stringify(r.clients))
    currentClient.value = JSON.parse(localStorage.getItem('currentClient'))
    const clientsParsed = parseClients(r.clients).filter(x => x?.id != currentClient.value?.id)
    if(clientsParsed.length != clients.value?.length)
      clients.value = clientsParsed 
  })
}

onMounted(() => {
  fetchClients()
  timer.value = setInterval(fetchClients, 1000)
})

watch(() => route.path, () => fetchClients())

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
const responsiveOptionsSelectedMode = ref([
  {
    breakpoint: '1200px',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '600px',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '480px',
    numVisible: 3,
    numScroll: 3
  }
]);

function selectPeople(people: any) {
  if (props.selectMode) {
    people.selected = !people.selected
    clients.value = clients.value.map(item => {
      if (item.name === people.name) {
        item.selected = people.selected
      }
      return item
    })
    emit('clientsSelected', clients.value.filter(x => x.selected))
  }
}
</script>

<style lang="scss">
.people-item {
    .people-item-content {
        margin-top: 1rem;
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

.gray {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
}
</style>