import { defineNuxtConfig } from 'nuxt'

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
    '~/assets/style/modal-item.scss'
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
