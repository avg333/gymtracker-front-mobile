<template>
  <div>
    <div class="row bg-grey-1 items-center">
      <div class="col-2">
        <q-icon size="lg" name="sports_gymnastics" />
      </div>
      <div class="col-10">
        {{ muscleSupGroup.name }}
      </div>
    </div>
    <q-separator />
  </div>
</template>

<script>
export default {
  props: { muscleSupGroup: Object },
};
</script>
