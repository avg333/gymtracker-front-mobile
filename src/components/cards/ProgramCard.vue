<template>
  <q-card class="my-card">
    <q-card-section>
      {{ program.name }}
    </q-card-section>
  </q-card>
</template>
<script>
import { ref } from "vue";
export default {
  props: { program: Object },
  emits: ["showSetModal"],
  setup(props) {
    return {};
  },
};
</script>
<style scoped>
.ppal {
  border-radius: 7px !important;
  margin: 7px;
}
</style>
