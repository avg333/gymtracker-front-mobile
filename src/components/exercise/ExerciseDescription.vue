<template>
  <div class="row text-center">
    <div class="col-2"></div>
    <div class="col-8">
      <div>
        <h5>
          {{ exercise.name }}
        </h5>
      </div>
    </div>
    <div class="col-2">
      <div>&nbsp;</div>
      <div>
        <q-btn flat :href="'https://www.google.com/search?q=' + exercise.name" target="_blank">
          <q-icon name="search" size="lg" />
        </q-btn>
      </div>
      <div>
        <q-btn flat :href="'https://www.youtube.com/results?search_query=' + exercise.name
          " target="_blank">
          <q-icon name="play_arrow" size="lg" />
        </q-btn>
      </div>
      <div>
        <q-icon name="favorite" size="lg" v-if="exercise.favourite" />
        <q-icon name="favorite_border" size="lg" v-else />
      </div>
    </div>
  </div>

  <div class="text-center" v-if="exercise.muscleGroupExercise">
  </div>

  <div class="text-center" v-if="exercise?.muscleGroupExercise">
    <strong v-for="(muscleSubGroup, index) in exercise.muscleGroupExercise" :key="muscleSubGroup.id">
      {{ muscleSubGroup.muscleGroup.name.toUpperCase() }}
      {{ index + 1 !== exercise.muscleGroupExercise.length ? " - " : "" }}
    </strong>
  </div>

  <div class="row text-center">
    <div class="col-4">ID: {{ exercise.id }}</div>
    <div class="col-4">
      Uni/Bi: {{ exercise.unilateral ? "Unilateral" : "Bilateral" }}
    </div>
    <div class="col-4">
      {{ $t("loadType." + exercise.loadType.name.toLowerCase()) }}
    </div>
  </div>

  <div class="text-center">Description:</div>
  <div class="text-center">{{ exercise.description }}</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Exercise } from 'src/types/exercises-api/ExerciseServiceTypes';
defineProps({
  exercise: { type: Object as PropType<Exercise>, required: true }
})
</script>
