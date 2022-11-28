<template>
  <div>
    <div class="row bg-grey-1 items-center">
      <div class="col-2">
        <q-icon size="lg">
          <img :src="getMuscleSupGroupIco(muscleSupGroup)" alt="?" />
        </q-icon>
      </div>
      <div class="col-10">
        {{ muscleSupGroup.name }}
      </div>
    </div>
    <q-separator />
  </div>
</template>

<script>
import { getMuscleSupGroupIco } from "src/utils/icoUtils";
export default {
  props: { muscleSupGroup: Object },
  setup() {
    return { getMuscleSupGroupIco };
  },
};
</script>
