<template>
  <div>
    <div class="flex justify-content-start w-full">
      <Button class="p-button-rounded p-button-secondary p-button-text p-button-lg" icon="pi pi-home" @click="goToMenuPage()"/>
    </div>
    <div class="container">
      <form 
        @submit.prevent="handleSubmit(!v$.$invalid)"
        class="flex flex-column justify-content-center align-items-center mt-5 inputs-data">
        <div class="field">
          <div class="p-float-label">
            <InputMask 
              id="cartao" 
              type="text" 
              v-model="v$.cartao.$model" 
              :class="{'p-invalid':v$.cartao.$invalid && submitted}" 
              mask="9999 9999 9999 9999"/>
            <label for="cartao" :class="{'p-error':v$.cartao.$invalid && submitted}">Número cartão*</label>
          </div>
          <small v-if="(v$.cartao.$invalid && submitted) || v$.cartao.$pending.$response" class="p-error">Número do cartão é obrigatório</small>
        </div>

        <div class="field">
          <div class="p-float-label">
            <InputMask 
              id="vencimento" 
              type="text" 
              v-model="v$.vencimento.$model" 
              :class="{'p-invalid':v$.vencimento.$invalid && submitted}" 
              mask="99/99"/>
            <label for="vencimento" :class="{'p-error':v$.vencimento.$invalid && submitted}">Vencimento*</label>
          </div>
          <small v-if="(v$.vencimento.$invalid && submitted) || v$.vencimento.$pending.$response" class="p-error">Vencimento é obrigatório</small>
        </div>

        <div class="field">
          <div class="p-float-label">
            <InputMask 
              id="codigo" 
              type="text" 
              v-model="v$.codigo.$model" 
              :class="{'p-invalid':v$.codigo.$invalid && submitted}" 
              mask="999"/>
            <label for="codigo" :class="{'p-error':v$.codigo.$invalid && submitted}">Código*</label>
          </div>
          <small v-if="(v$.codigo.$invalid && submitted) || v$.codigo.$pending.$response" class="p-error">Código é obrigatório</small>
        </div>

        <div class="field">
          <div class="p-float-label">
            <InputText 
              id="nome" 
              type="text" 
              v-model="v$.nome.$model" 
              :class="{'p-invalid':v$.nome.$invalid && submitted}"/>
            <label for="nome" :class="{'p-error':v$.nome.$invalid && submitted}">Nome completo*</label>
          </div>
          <small v-if="(v$.nome.$invalid && submitted) || v$.nome.$pending.$response" class="p-error">Nome é obrigatório</small>
        </div>

        <div class="field">
          <div class="p-float-label">
            <InputMask
              id="cpf" 
              type="text" 
              v-model="v$.cpf.$model" 
              class="p-component" 
              mask="999.999.999-99" 
              :class="{'p-invalid':v$.cpf.$invalid && submitted}"/>
            <label for="cpf" :class="{'p-error':v$.cpf.$invalid && submitted}">CPF*</label>
          </div>
          <small v-if="(v$.cpf.$invalid && submitted) || v$.cpf.$pending.$response" class="p-error">CPF é obrigatório</small>
        </div>

        <div class="mx-2">
          <div class="w-full flex justify-content-start mt-3 gap-2 align-items-center">
            <span class="text-lg font-semibold">Total: </span>
            <span class="text-lg">{{money(total)}}</span>
            <Button type="submit" label="Concluir" class="p-component"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useStore } from "@/stores/main-store";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const mainStore = useStore();
const config = useRuntimeConfig().public
const router = useRouter();
const solicitations = ref()
const toast = useToast();
const submitted = ref(false);
const state = reactive({
  cartao: '',
  vencimento: '',
  codigo: '',
  nome: '',
  cpf: ''
});

const rules = {
    cartao: { required },
    vencimento: { required },
    codigo: { required },
    nome: { required },
    cpf: { required }
};

const v$ = useVuelidate(rules, state);

function goToMenuPage() {
  router.push('/menu')
}

onMounted(() => {
  currentClient.value = mainStore.currentClient
  tableId.value = mainStore.tableId != 0 && typeof mainStore.tableId != 'undefined' ? mainStore.tableId : mainStore.tableCode
})

const total = computed(() => {
  let totalValue = 0
  solicitations.value?.forEach(solicitation => {
    totalValue += solicitation.items[0].item.value / solicitation.clientsSolicitation.length
  });
  return totalValue
});

function money (value: Number) {
  return `R$${value.toFixed(2).replace('.', ',')}`
}
definePageMeta({
  layout: "app-layout",
});
const currentClient = ref({id: 0})


const tableId = ref()
mainStore.$subscribe((_, state) => {
  if(state.tableId != 0 && typeof state.tableId != 'undefined')
    tableId.value = state.tableId

  if(state.tableCode != '' && typeof state.tableCode != 'undefined')
    tableId.value = state.tableCode
})

function handleSubmit(isFormValid: Boolean) {
  submitted.value = true;
  if (!isFormValid) {
    return;
  }
  inactiveClient()
  .then(() => {
    toast.add({severity:'success', summary: 'Sucesso', detail:'Conta pagaa!!', life: 3000});
    router.push(`/checkout/exit`)
  })
}

async function inactiveClient() {
  return await $fetch(`${config.SERVER_URL}/v1/api/client/${currentClient.value.id}/inactive?orderPadId=${mainStore.orderPadId}`,{method: 'PUT'})
}
</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>