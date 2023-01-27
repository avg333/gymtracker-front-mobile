<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title> Ejercicios </q-toolbar-title>
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

      <ExercisesFilterBar
        :muscleGroupId="state.filter.selectedMuscleGroupId"
        :selectedFav="state.filter.selectedFav"
        :selectedUnilateral="state.filter.selectedUnilateral"
        :selectedLoadType="state.filter.selectedLoadType"
        :selectedMuscleSubGroups="state.filter.selectedMuscleSubGroups"
        :selectedMuscleSupGroupId="state.filter.selectedMuscleSupGroupId"
        :selectedMuscleGroupId="state.filter.selectedMuscleGroupId"
        @changeSelectedFav="
          state.filter.selectedFav = !state.filter.selectedFav
        "
        @changeSelectedUnilateral="
          state.filter.selectedUnilateral = !state.filter.selectedUnilateral
        "
        @setSelectedLoadType="setSelectedLoadType"
        @setSelectedMuscleSubGroups="setSelectedMuscleSubGroups"
        @setSelectedMuscleSupGroup="setSelectedMuscleSupGroup"
        @setSelectedMuscleGroup="setSelectedMuscleGroup"
      />
    </div>
    <q-scroll-observer />

    <div>
      <ExerciseCard
        v-for="exercise in state.exercises"
        :key="exercise.id"
        :exercise="exercise"
        @click="
          state.setGroup?.id || state.workout?.id
            ? addExercise(exercise.id)
            : $router.push('/exercises/' + exercise.id)
        "
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive, onBeforeMount, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import ExerciseCard from "components/cards/ExerciseCard.vue";
import ExercisesFilterBar from "components/ExercisesFilterBar.vue";
import SetGroupService from "src/services/SetGroupService";
import WorkoutService from "src/services/WorkoutService";
import ExerciseService from "src/services/ExerciseService";
export default defineComponent({
  name: "ExercisesPage",
  components: { ExerciseCard, ExercisesFilterBar },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const setGroupId = route.query.setGroupId;
    const workoutId = route.query.workoutId;

    const state = reactive({
      exercises: [],
      filter: {
        selectedFav: false,
        selectedUnilateral: null,
        selectedLoadType: null,
        selectedMuscleSupGroupId: null,
        selectedMuscleGroupId: null,
        selectedMuscleSubGroups: [],
      },
      workout: {},
      setGroup: {
        id: null,
        description: null,
        listOrder: -1,
        session: {},
        workout: {},
        exercise: {},
      },
    });

    onBeforeMount(async () => {
      loadExercises();
      if (setGroupId) {
        SetGroupService.getById(setGroupId).then((res) => {
          state.setGroup = res;
        });
      }
      if (workoutId) {
        //TODO Esto es necesario si hay setGroupId?
        WorkoutService.getById(workoutId).then((res) => {
          state.workout = res;
        });
      }
    });

    watchEffect(() => {
      loadExercises(state.filter);
    });

    function loadExercises() {
      ExerciseService.getAll({
        unilateral: state.filter.selectedUnilateral,
        loadType: state.filter.selectedLoadType,
        muscleSupGroupIds: state.filter.selectedMuscleSupGroupId,
        muscleGroupIds: state.filter.selectedMuscleGroupId,
        selectedMuscleSubGroups: state.filter.selectedMuscleSubGroups,
      }).then((res) => {
        state.exercises = res;
      });
    }

    async function addExercise(exerciseId) {
      state.setGroup.exercise.id = exerciseId;
      if (state.setGroup?.id) {
        await SetGroupService.update(state.setGroup.id, state.setGroup);
      } else {
        state.setGroup.workout.id = workoutId;
        await SetGroupService.createInWorkout(workoutId, state.setGroup);
      }
      router.push({
        path: "/",
        query: { date: state.workout.date },
      });
    }

    function setSelectedLoadType(loadType) {
      state.filter.selectedLoadType = loadType;
    }

    function setSelectedMuscleSupGroup(muscleSupGroupId) {
      state.filter.selectedMuscleGroupId = null;
      if (!muscleSupGroupId) {
        state.filter.selectedMuscleSupGroupId = null;
        return;
      }

      state.filter.selectedMuscleSupGroupId =
        state.filter.selectedMuscleSupGroupId === muscleSupGroupId
          ? null
          : muscleSupGroupId;
    }

    function setSelectedMuscleGroup(muscleGroupId) {
      if (
        !muscleGroupId ||
        state.filter.selectedMuscleGroupId === muscleGroupId
      ) {
        state.filter.selectedMuscleGroupId = null;
      }
      {
        state.filter.selectedMuscleGroupId = muscleGroupId;
      }
    }

    function setSelectedMuscleSubGroups(muscleSubGroups) {
      state.filter.selectedMuscleSubGroups = muscleSubGroups;
      loadExercises(state.filter);
    }

    return {
      state,
      addExercise,
      setSelectedLoadType,
      setSelectedMuscleSubGroups,
      setSelectedMuscleSupGroup,
      setSelectedMuscleGroup,
    };
  },
});
</script>
