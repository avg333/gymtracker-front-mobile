<template>
  <q-select
    style="font-size: 0.75em"
    v-model="selectedIncrement"
    :options="increments"
    borderless
    dropdown-icon=" "
    @update:model-value="
      $emit('changueSelectedIncrement', selectedIncrement.value)
    "
  />
</template>
<script>
import { ref } from "vue";
export default {
  props: { selectedValue: Number },
  emits: ["changueSelectedIncrement"],
  setup(props) {
    const increments = [
      {
        label: "±0.25",
        value: 0.25,
      },
      {
        label: "±0.5",
        value: 0.5,
      },
      {
        label: "±1.0",
        value: 1,
      },
      {
        label: "±1.25",
        value: 1.25,
      },
      {
        label: "±2.5",
        value: 2.5,
      },
      {
        label: "±5.0",
        value: 5,
      },
    ];
    const selectedIncrement = ref(
      increments.find((element) => element.value === props.selectedValue)
    );

    return {
      selectedIncrement,
      increments,
    };
  },
};
</script>
