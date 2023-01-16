import { defineStore } from "pinia";
//import LoginService from "src/services/LoginService";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    selectedBar: 0,
    bars: [20, 15, 10],
    selectedPlate: 0,
    plates: "",
    selectedIncrement: 1,
  }),
  getters: {
    getSelectedIncrement: function (state) {
      return state.selectedIncrement
    }
  },
  actions: {
    setSelectedIncrement(increment) {
      this.selectedIncrement = increment
    },
  },
});
