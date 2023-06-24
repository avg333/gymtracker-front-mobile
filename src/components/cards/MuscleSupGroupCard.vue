<template>
  <div class="col-6">
    <q-card class="my-card">
      <q-img :src="getMuscleSupGroupIco(muscleSupGroup)">
        <div class="absolute-bottom text-subtitle2 text-center">
          {{ $t("muscleSupGroup." + muscleSupGroup.id) }}
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { MuscleGroup } from 'src/types/workouts-api/WorkoutServiceTypes';
import { getMuscleSupGroupIco } from 'src/utils/icoUtils';
export default defineComponent({
  props: { muscleSupGroup: { type: Object as PropType<MuscleGroup>, required: true } },
  setup() {
    return { getMuscleSupGroupIco };
  },
});
</script>
