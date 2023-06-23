import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    selectedIncrement: 1,
    selectedBar: 10,
    selectedPlates: [20, 15, 10, 5, 2.5, 1.25],
  }),
  getters: {
    getSelectedIncrement: function (state) {
      return state.selectedIncrement;
    },
    getSelectedBar: function (state) {
      return state.selectedBar;
    },
    getSelectedPlates: function (state) {
      return state.selectedPlates;
    },
  },
  actions: {
    setSelectedIncrement(increment: number) {
      this.selectedIncrement = increment;
    },
    setSelectedBar(bar: number) {
      this.selectedBar = bar;
    },
    setSelectedPlates(plates: number[]) {
      this.selectedPlates = plates;
    },
  },
});
