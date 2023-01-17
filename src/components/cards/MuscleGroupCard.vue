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

<script>
import { getMuscleGroupIco } from "src/utils/icoUtils";
export default {
  props: { muscleGroup: Object },
  setup() {
    return { getMuscleGroupIco };
  },
};
</script>
