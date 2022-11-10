import { useStore } from "@/stores/main-store"

const whiteListHome = ['index', 'table-id']
const blackListLogin = ['menu', 'checkout', 'checkout-payment', 'checkout-exit']

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore()
  if(store.currentClient.id == 0 && !whiteListHome.includes(to.name.toString()))
    return navigateTo('/')

  if(store.currentClient.id != 0 && !blackListLogin.includes(to.name.toString()))
    return navigateTo('/menu')
})