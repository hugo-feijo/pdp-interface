<template>
  <div class="flex flex-column">
    <div class="restaurant-header w-full overflow-hidden flex justify-content-center align-items-center">
      <img src="~/assets/img/coffe-shop.jpg" class="max-w-full">
    </div>
		<div>
      <form 
        @submit.prevent="handleSubmit(!v$.$invalid)"
        class="flex flex-column justify-content-center align-items-center mt-5 inputs-data">
        <div class="field">
          <div class="p-float-label">
            <InputText id="name" type="text" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}"/>
            <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Nome*</label>
          </div>
          <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">Nome é obrigatório</small>
        </div>
        <div class="field">
          <div class="p-float-label">
            <InputMask id="cpf" type="text" v-model="v$.cpf.$model" class="p-component" mask="999.999.999-99" :class="{'p-invalid':v$.name.$invalid && submitted}"/>
            <label for="cpf" :class="{'p-error':v$.name.$invalid && submitted}">CPF*</label>
          </div>
          <small v-if="(v$.cpf.$invalid && submitted) || v$.cpf.$pending.$response" class="p-error">CPF é obrigatório</small>
        </div>
        <Button type="submit" label="Entrar" class="p-component"/>
      </form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const router = useRouter();
const route = useRoute();

definePageMeta({
  layout: "app-layout",
});

const submitted = ref(false);
const showMessage = ref(false);
const state = reactive({
  name: '',
  cpf: ''
});

const rules = {
    name: { required },
    cpf: { required }
};

const v$ = useVuelidate(rules, state);

const tableId = route.params.id
const config = useRuntimeConfig().public

onMounted(() => localStorage.setItem('tableId', tableId.toString()))

function handleSubmit(isFormValid: Boolean) {
  submitted.value = true;
  if (!isFormValid) {
    return;
  }
  toggleDialog();
  createClient().then((result) => {
    localStorage.setItem('currentClient', JSON.stringify(result))
    router.push('/menu')
  })
}

function toggleDialog() {
    showMessage.value = !showMessage.value;

    if(!showMessage.value) {
        resetForm();
    }
}

function resetForm() {
  state.name = '';
  state.cpf = '';
}

async function createClient() {
  return await $fetch(`${config.SERVER_URL}/v1/api/client`, {method: 'POST', body: state, headers: {'X-Order-Pad-Id': localStorage.getItem('orderPadId')}})
}

</script>


<style lang="scss">
body {
  background-color: rgb(250, 254, 255);
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.inputs-data {
  gap: 1rem;
}

.restaurant-header {
  max-height: 25rem;
}
</style>