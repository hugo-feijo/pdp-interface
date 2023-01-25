import { useStore } from "@/stores/main-store"

const loggedOutPages = ['index', 'table-id', 'admin', 'admin-comandas']
const loggedInPages = ['menu', 'checkout', 'checkout-payment', 'checkout-exit']

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore()
  if(store.currentClient.id == 0 && !loggedOutPages.includes(to.name.toString()))
    return navigateTo('/')

  if(store.currentClient.id != 0 && !loggedInPages.includes(to.name.toString()))
    return navigateTo('/menu')
})