<template>
  <div class="text-center">
  </div>
  <div class="text-center text-grey">
    {{ 0 }} {{ $t("tracker.exs") }}
    {{ 0 }} {{ $t("tracker.sets") }}
    {{ 0 }} {{ $t("tracker.kg") }}
    {{ 0 }} {{ $t("tracker.mins") }}
  </div>
</template>

<script lang="ts">
//READY
import { defineComponent } from 'vue'
import { getMuscleGroupColour } from 'src/utils/colourUtils';
export default defineComponent({
  name: 'SummaryWo',
  props: { workout: { required: true } },
  setup() {
    return { getMuscleGroupColour };
  },
});
</script>
