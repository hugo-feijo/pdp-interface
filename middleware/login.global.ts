import { useStore } from "@/stores/main-store"

const whiteList = ['index', 'table-id']

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore()
  if(store.currentClient.id == 0 && !whiteList.includes(to.name.toString()))
    return navigateTo('/')
})