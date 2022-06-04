<template>
  <div>
    <div class="flex justify-content-start w-full">
      <Button class="p-button-rounded p-button-secondary p-button-text p-button-lg" icon="pi pi-home" @click="goToMenuPage()"/>
    </div>
    <h1>checkout</h1>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();

definePageMeta({
  layout: "app-layout",
});

function goToMenuPage() {
  router.push('/menu')
}

</script>