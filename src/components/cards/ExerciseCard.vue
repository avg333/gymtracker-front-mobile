<template>
  <div>
    <div class="row bg-grey-1 items-center">
      <div class="col-2">
        <q-btn flat dense round size="lg" icon="sports_gymnastics"
          @click.stop="$router.push('/exercises/' + exercise.id)" />
      </div>
      <div class="col-10">
        {{ exercise.name.toUpperCase() }}
      </div>
    </div>
    <q-separator />
  </div>
</template>

<script setup lang="ts">
import { Exercise } from 'src/types/exercises-api/ExerciseServiceTypes';
import { PropType } from 'vue'
defineProps({ exercise: { type: Object as PropType<Exercise>, required: true } })
</script>
