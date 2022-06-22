import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return { 
      tableId: 0,
      tableCode: '',
      orderPadId: 0,
      clients: [],
      currentClient: {id: 0},
      restaurantUnityId: 0,
    }
  },
  actions: {
    setTableId(tableId: Number) {
      this.tableId = tableId;
    },
  },
  persist: true
})