import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return { 
      tableId: 0,
      orderPadId: 0,
      clients: [],
    }
  },
  actions: {
    setTableId(tableId: Number) {
      this.tableId = tableId;
    },
  },
})