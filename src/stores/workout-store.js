import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    workout: null,
    workoutId: null,
    lastUpdateTimeStamp: null
  }),
  getters: {
    getWorkout: function (state) {
      return state.workout
    }
  },
  actions: {
    setSelectedIncrement(increment) {
      this.selectedIncrement = increment
    },
    setSelectedBar(bar) {
      this.selectedBar = bar
    },
    setSelectedPlates(plates) {
      this.selectedIselectedPlatesncrement = plates
    },
  },
});
