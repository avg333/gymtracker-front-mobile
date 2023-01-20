<template>
  <div class="text-center">
    <strong
      v-for="(muscle, index) in workout.muscleGroupDtos"
      :key="index"
      :class="'text-' + getMuscleGroupColour(muscle)"
    >
      {{ $t("muscleGroup." + muscle.id).toUpperCase() }}
      {{ muscle.volume }}
      {{ index + 1 !== workout.muscleGroupDtos.length ? " - " : "" }}
    </strong>
  </div>
  <div class="text-center text-grey">
    {{ workout.exerciseNumber || 0 }} {{ $t("tracker.exs") }}
    {{ workout.setsNumber || 0 }} {{ $t("tracker.sets") }}
    {{ workout.weightVolume || 0 }} {{ $t("tracker.kg") }}
    {{ workout.duration || 0 }} {{ $t("tracker.mins") }}
  </div>
</template>

<script>
//READY
import { getMuscleGroupColour } from "src/utils/colourUtils";
export default {
  name: "SummaryWo",
  props: { workout: Object },
  setup() {
    return { getMuscleGroupColour };
  },
};
</script>
