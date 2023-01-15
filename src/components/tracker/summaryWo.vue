<template>
  <div class="row text-center text-grey">
    <div class="col-12">
      <span>
        {{ workout.exerciseNumber || 0 }} {{ $t("tracker.exs") }}
        {{ workout.setsNumber || 0 }} {{ $t("tracker.sets") }}
        {{ workout.weightVolume || 0 }} {{ $t("tracker.kg") }}
        {{ workout.duration || 0 }} {{ $t("tracker.mins") }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: { workout: Object },
};
</script>
