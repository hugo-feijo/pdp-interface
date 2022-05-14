<template>
  <div class="flex flex-column">
    <div class="restaurant-header w-full overflow-hidden flex justify-content-center align-items-center">
      <img src="~/assets/img/coffe-shop.jpg" class="max-w-full">
    </div>
		<div>
      <div class="flex flex-column gap-8 justify-content-center align-items-center mt-5 inputs-data">
        <span class="p-float-label">
          <InputText id="name" type="text" v-model="user.name"/>
          <label for="name">Nome</label>
        </span>
        <span class="p-float-label">
          <InputMask id="cpf" type="text" v-model="user.cpf" class="p-component" mask="999.999.999-99"/>
          <label for="cpf">CPF</label>
        </span>
        <Button type="submit" label="Entrar" class="p-component"/>
      </div>
		</div>
	</div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "app-layout",
});
const user = ref({
  name: "",
  cpf: ""
});
</script>


<style lang="scss">
body {
  margin: 0;
}

.inputs-data {
  gap: 2rem;
}

.restaurant-header {
  max-height: 25rem;
}
</style>