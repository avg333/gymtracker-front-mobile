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
              exerciseName: state.setGroup?.exercise?.name,
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
import { GetWorkoutResponse, GetWorkoutResponseSetGroups, Exercise } from 'src/types/workouts-api/WorkoutServiceTypes';
export default defineComponent({
  name: 'ExercisesPage',
  components: { ExerciseCard, ExercisesFilterBar },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const setGroupId: string | null = route.query.setGroupId;
    const workoutId: string = route.query.workoutId;

    const state: State = reactive({
      exercises: [],
      selectedExercisesId: [],
      workout: null,
      setGroup: null,
    });

    interface State {
      exercises: Exercise[],
      selectedExercisesId: string[],
      workout: GetWorkoutResponse | null,
      setGroup: GetWorkoutResponseSetGroups | null,
    };

    const filter: Ref<Filter> = ref({
      selectedFav: false,
      selectedUnilateral: false,
      selectedLoadType: '',
      selectedMuscleSupGroupId: '',
      selectedMuscleGroupId: '',
      selectedMuscleSubGroups: []
    });

    interface Filter {
      selectedFav: boolean,
      selectedUnilateral: boolean,
      selectedLoadType: string | null,
      selectedMuscleSupGroupId: string | null,
      selectedMuscleGroupId: string | null,
      selectedMuscleSubGroups: string[],
    }

    onBeforeMount(() => {
      loadExercises(null);
      if (setGroupId) {
        SetGroupService.getById(setGroupId).then((setGroup) => {
          state.setGroup = setGroup;
          WorkoutService.getById(setGroup.workout.id).then((wo) => {
            state.workout = wo;
          });
          preSetFilter(setGroup?.exercise);
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

    function loadExercises(filter: Filter | null) {
      if (filter)
        ExerciseService.getAll({
          unilateral: filter.selectedUnilateral,
          loadType: filter.selectedLoadType,
          muscleSupGroupIds: filter.selectedMuscleSupGroupId,
          muscleGroupIds: filter.selectedMuscleGroupId,
          selectedMuscleSubGroups: filter.selectedMuscleSubGroups,
        }).then((res) => {
          state.exercises = res;
        });
      else
        ExerciseService.getAll().then((res) => {
          state.exercises = res;
        });
    }

    async function addExercise(exerciseId: string) {

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
    function preSetFilter(exercise: Exercise) {
      if (!exercise) {
        return;
      }
      //TODO Mejorar esto
      const muscleGroupExercises = exercise.muscleGroupExercises;
      const muscleSubGroups = exercise.muscleSubGroups;
      const selectedMuscleGroupId = muscleGroupExercises[0].muscleGroup.id;
      const selectedMuscleSupGroupId =
        muscleGroupExercises[0].muscleGroup.muscleSupGroups[0].id;
      const selectedMuscleSubGroups = muscleSubGroups?.map((a) => a?.id);

      exerciseFilterBarRef.value.preSetFilter(
        selectedMuscleSupGroupId,
        selectedMuscleGroupId,
        selectedMuscleSubGroups
      );
    }

    function setFilter(filterValue: Filter) {
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
