<template>
  <div class="row text-center">
    <div class="col-12">
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
  </div>
</template>

<script>
import { getMuscleGroupColour } from "src/utils/colourUtils";
export default {
  props: { workout: Object },
  setup() {
    return { getMuscleGroupColour };
  },
};
</script>
