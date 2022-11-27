<template>
  <div>
    <div class="row bg-grey-1 items-center">
      <div class="col-2">
        <q-btn
          flat
          dense
          round
          size="lg"
          icon="sports_gymnastics"
          @click.stop="$router.push('/exercises/' + exercise.id)"
        />
      </div>
      <div class="col-10">
        {{ exercise.name.toUpperCase() }}
      </div>
    </div>
    <q-separator />
  </div>
</template>

<script>
export default {
  props: { exercise: Object },
};
</script>
