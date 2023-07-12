<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title>
          {{ $t("muscleGroupPages.exercises") }}
        </q-toolbar-title>
        <q-space />
        <q-btn-group flat>
          <q-btn flat dense round icon="add" />
        </q-btn-group>
      </q-toolbar>

      <q-toolbar v-if="state.setGroup?.id">
        <span>
          {{
            $t("muscleGroupPages.replaceExerciseInWorkout", {
              exerciseName: state.setGroup?.exerciseId,
            })
          }}
        </span>
      </q-toolbar>
      <q-toolbar v-else-if="state.workout?.id">
        <span>
          {{
            $t("muscleGroupPages.addExerciseToWorkout", {
              date: state.workout?.date,
            })
          }}
        </span>
      </q-toolbar>

      <ExercisesFilterBar ref="exerciseFilterBarRef" @setFilter="setFilter" />
    </div>

    <ExerciseCard v-for="exercise in state.exercises" :key="exercise.id" :exercise="exercise" @click="
      state.setGroup?.id || state.workout?.id
        ? addExercise(exercise.id)
        : $router.push('/exercises/' + exercise.id)
      " />
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onBeforeMount,
  watchEffect,
} from 'vue';
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import ExerciseCard from 'components/cards/ExerciseCard.vue';
import ExercisesFilterBar from 'components/ExercisesFilterBar.vue';
import SetGroupService from 'src/services/workouts-api/SetGroupService';
import WorkoutService from 'src/services/workouts-api/WorkoutService';
import ExerciseService from 'src/services/exercises-api/ExerciseService';
import { GetWorkoutResponse } from 'src/types/workouts-api/WorkoutServiceTypes';

import { ExerciseSimple, ExerciseFilterRequest } from 'src/types/exercises-api/ExerciseServiceTypes';
import { GetSetGroupResponse } from 'src/types/workouts-api/SetGroupServiceTypes';
export default defineComponent({
  name: 'ExercisesPage',
  components: { ExerciseCard, ExercisesFilterBar },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const setGroupId: string | null = route.query.setGroupId as string;
    const workoutId: string = route.query.workoutId as string;

    const state: State = reactive({
      exercises: [],
      selectedExercisesId: [],
      workout: null,
      setGroup: null,
    });
    interface State {
      exercises: ExerciseSimple[],
      selectedExercisesId: string[],
      workout: GetWorkoutResponse | null,
      setGroup: GetSetGroupResponse | null,
    };

    const filter: Ref<ExerciseFilterRequest> = ref({
      name: null,
      description: null,
      selectedFav: false,
      unilateral: false,
      loadType: '',
      muscleSupGroupIds: '',
      muscleGroupIds: '',
      muscleSubGroupIds: []
    });

    onBeforeMount(() => {
      loadExercises({});
      if (setGroupId) {
        SetGroupService.getById(setGroupId).then((setGroup) => {
          if (setGroup) {

            state.setGroup = setGroup;
            WorkoutService.getById(setGroup.workout.id).then((wo) => {
              state.workout = wo;
            });
            preSetFilter(setGroup.exerciseId);
          }
        });
      } else if (workoutId) {
        WorkoutService.getById(workoutId).then((res) => {
          state.workout = res;
        });
      }
    });

    watchEffect(() => {
      loadExercises(filter.value);
    });

    function loadExercises(filter: ExerciseFilterRequest | object) {
      ExerciseService.getAll(filter).then((res) => {
        state.exercises = res;
      });
    }

    async function addExercise(exerciseId: string) {
      if (!state.workout?.date) {
        console.error('El workout es null!')
        return
      }

      const setGroupCreateRequest = {
        description: null,
        exerciseId,
      };
      if (state.setGroup?.id) {
        await SetGroupService.updateExercise(state.setGroup.id, exerciseId);
      } else {
        await SetGroupService.create(workoutId, setGroupCreateRequest);
      }
      router.push({
        path: '/',
        query: { date: state.workout.date },
      });
    }

    const exerciseFilterBarRef = ref(null);
    async function preSetFilter(exerciseId: string) {
      if (!exerciseId) {
        return;
      }//TODO
    }

    function setFilter(filterValue: ExerciseFilterRequest) {
      filter.value = filterValue;
    }

    return {
      state,
      addExercise,
      setFilter,
      exerciseFilterBarRef,
    };
  },
});
</script>
