import { useStore } from "@/stores/main-store"

const loggedOutPages = ['index', 'table-id']
const loggedInPages = ['menu', 'checkout', 'checkout-payment', 'checkout-exit']

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore()
  if(!loggedOutPages.includes(to.name ? to.name.toString() : '') && !loggedInPages.includes(to.name ? to.name.toString() : ''))
    return

  if(store.currentClient.id == 0 && !loggedOutPages.includes(to.name ? to.name.toString() : ''))
    return navigateTo('/')

  if(store.currentClient.id != 0 && !loggedInPages.includes(to.name ? to.name.toString() : ''))
    return navigateTo('/menu')
})