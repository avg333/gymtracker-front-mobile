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

<script>
import { getMuscleSupGroupIco } from 'src/utils/icoUtils';
export default {
  props: { muscleSupGroup: Object },
  setup() {
    return { getMuscleSupGroupIco };
  },
};
</script>
