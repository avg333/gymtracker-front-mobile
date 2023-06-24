<template>
  <div class="col-6">
    <q-card class="my-card">
      <q-img :src="getMuscleGroupIco(muscleGroup)">
        <div class="absolute-bottom text-subtitle2 text-center">
          {{ $t("muscleGroup." + muscleGroup.id) }}
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { MuscleGroup } from 'src/types/workouts-api/WorkoutServiceTypes';
import { getMuscleGroupIco } from 'src/utils/icoUtils';
export default defineComponent({
  props: { muscleGroup: { type: Object as PropType<MuscleGroup>, required: true } },
  setup() {
    return { getMuscleGroupIco };
  },
});
</script>
