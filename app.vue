<template>
  <div>
    <NuxtLayout>
      <ClientOnly>
        <Loading />
        <Toast position="bottom-right"/>
      </ClientOnly>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
