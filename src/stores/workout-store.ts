import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    workout: null,
    workoutId: null,
    lastUpdateTimeStamp: null,
  }),
  getters: {
    getWorkout: function (state) {
      return state.workout;
    },
  },
  actions: {},
});
