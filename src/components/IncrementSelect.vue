<template>
  <q-select style="font-size: 0.75em" v-model="selectedIncrement" :options="increments" borderless dropdown-icon=" " />
</template>

<script>
//READY
const increments = [
  {
    label: '±0.25',
    value: 0.25,
  },
  {
    label: '±0.5',
    value: 0.5,
  },
  {
    label: '±1.0',
    value: 1,
  },
  {
    label: '±1.25',
    value: 1.25,
  },
  {
    label: '±2.5',
    value: 2.5,
  },
  {
    label: '±5.0',
    value: 5,
  },
];
import { ref, watchEffect } from 'vue';
import { useSettingsStore } from 'stores/settings-store';
export default {
  name: 'IncrementSelect',
  emits: ['changueSelectedIncrement'],
  setup(_, { emit }) {
    const useStore = useSettingsStore();

    const selectedIncrement = ref(
      increments.find(
        (element) => element.value === useStore.getSelectedIncrement
      )
    );

    watchEffect(() => {
      emit('changueSelectedIncrement', selectedIncrement.value.value);
      useStore.setSelectedIncrement(selectedIncrement.value.value);
    });

    return {
      selectedIncrement,
      increments,
    };
  },
};
</script>
