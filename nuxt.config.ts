// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '~/assets/style/modal-item.scss',
    'vue-loading-overlay/dist/css/index.css'
  ],
  modules: [
    '@pinia/nuxt',
  ],
  build: {
      transpile: ['primevue']
  },
  runtimeConfig: {
    public: {
      SERVER_URL: process.env.SERVER_URL
    }
  }
})
