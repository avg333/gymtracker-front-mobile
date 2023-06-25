<template>
  <q-select style="font-size: 0.75em" v-model="selectedIncrement" :options="increments" borderless dropdown-icon=" " />
</template>

<script setup lang="ts">
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
const emit = defineEmits<{
  changueSelectedIncrement: [value: number]
}>()
const useStore = useSettingsStore();
const selectedIncrement = ref(
  increments.find(
    (element) => element.value === useStore.getSelectedIncrement
  )
);

watchEffect(() => {
  if (!selectedIncrement.value) {
    console.error('No se ha encontrador el selectedIncrement!')
    return
  }

  emit('changueSelectedIncrement', selectedIncrement.value.value);
  useStore.setSelectedIncrement(selectedIncrement.value.value);
});
</script>
