<template>
  <q-card class="my-card">
    <q-card-section>
      {{ program.name }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: { program: Object },
};
</script>
