import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return { 
      tableId: 0 
    }
  },
  actions: {
    setTableId(tableId: Number) {
      this.tableId = tableId;
    },
  },
})