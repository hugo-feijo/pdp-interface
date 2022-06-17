<template>
  <div>
    <form 
      @submit.prevent="handleSubmit(!v$.$invalid)"
      class="flex flex-column justify-content-center align-items-center">
      <div class="h-30rem overflow-hidden flex justify-content-center align-items-center">
        <img src="~/public/img/identificador.png" class="max-h-full">
      </div>
      <div class="field">
        <div class="p-float-label">
          <InputText id="tableCode" type="text" v-model="v$.tableCode.$model" :class="{'p-invalid':v$.tableCode.$invalid && submitted}"/>
          <label for="tableCode" :class="{'p-error':v$.tableCode.$invalid && submitted}">Identificador da mesa*</label>
        </div>
        <small v-if="(v$.tableCode.$invalid && submitted) || v$.tableCode.$pending.$response" class="p-error">Nome é obrigatório</small>
      </div>
      <Button type="submit" label="Entrar" class="p-component"/>
    </form>
  </div>
</template>
<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const submitted = ref(false);
const router = useRouter();
const state = reactive({
  tableCode: ''
});
const rules = {
    tableCode: { required }
};

const v$ = useVuelidate(rules, state);

function handleSubmit(isFormValid: Boolean) {
  submitted.value = true;
  if (!isFormValid) {
    return;
  }
  router.push(`/table/${state.tableCode}`);
}
</script>