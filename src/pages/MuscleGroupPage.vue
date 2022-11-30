<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title>
          {{ $t("muscleGroup." + $route.params.muscleGroupId) }}
        </q-toolbar-title>
        <q-space />
        <q-btn-group flat>
          <q-btn flat dense round icon="add" />
        </q-btn-group>
      </q-toolbar>
      <q-toolbar v-if="setGroup.id">
        <span>
          {{
            $t("muscleGroupPages.replaceExerciseInWorkout", {
              exerciseName: setGroup.exerciseDto?.name,
            })
          }}
        </span>
      </q-toolbar>
      <q-toolbar v-else-if="workout.id">
        <span>
          {{
            $t("muscleGroupPages.addExerciseToWorkout", {
              date: moment(workout.date).format("YYYY/MM/DD"),
            })
          }}
        </span>
      </q-toolbar>
      <q-toolbar>
        <q-tabs class="maxAncho">
          <q-chip
            color="orange"
            square
            clickable
            icon="star"
            :outline="!filter.selectedFav"
            @click="filter.selectedFav = !filter.selectedFav"
          />
          <q-chip
            color="purple"
            square
            clickable
            :outline="!filter.selectedUnilateral"
            @click="
              filter.selectedUnilateral
                ? (filter.selectedUnilateral = null)
                : (filter.selectedUnilateral = true)
            "
          >
            {{ $t("muscleGroupPages.filter.unilateral") }}
          </q-chip>
          <q-chip
            v-for="muscleSubGroup in muscleGroup.muscleSubGroups"
            :key="muscleSubGroup.name"
            color="red"
            square
            clickable
            :outline="
              !filter.selectedMuscleSubGroups.includes(muscleSubGroup.id)
            "
            @click="
              filter.selectedMuscleSubGroups.indexOf(muscleSubGroup.id) > -1
                ? filter.selectedMuscleSubGroups.splice(
                    filter.selectedMuscleSubGroups.indexOf(muscleSubGroup.id),
                    1
                  )
                : filter.selectedMuscleSubGroups.push(muscleSubGroup.id)
            "
          >
            {{ muscleSubGroup.name }}
          </q-chip>
          <q-chip
            v-for="loadType in loadTypes"
            :key="loadType"
            color="primary"
            square
            clickable
            :outline="filter.selectedLoadType !== loadType"
            @click="
              filter.selectedLoadType === loadType
                ? (filter.selectedLoadType = null)
                : (filter.selectedLoadType = loadType)
            "
          >
            {{ loadType }}
          </q-chip>
        </q-tabs>
      </q-toolbar>
    </div>
    <ExerciseCard
      v-for="exercise in exercises"
      :key="exercise.id"
      :exercise="exercise"
      @click="
        setGroup.id || workout.id
          ? addExercise(exercise.id)
          : $router.push('/exercises/' + exercise.id)
      "
    />
  </q-page>
</template>

<script>
import moment from "moment";
import {
  defineComponent,
  ref,
  reactive,
  onBeforeMount,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import ExerciseCard from "src/components/cards/ExerciseCard.vue";
import MuscleGroupService from "src/services/MuscleGroupService";
import EnumService from "src/services/EnumService";
import SetGroupService from "src/services/SetGroupService";
import WorkoutService from "src/services/WorkoutService";
import ExerciseService from "src/services/ExerciseService";
export default defineComponent({
  name: "MuscleGroupPage",
  components: { ExerciseCard },
  setup() {
    const loadTypes = ref([]);
    const exercises = ref([]);
    const muscleGroup = reactive({});

    const workout = reactive({});
    const setGroup = reactive({
      id: null,
      description: null,
      listOrder: -1,
      exerciseId: null,
      sessionId: null,
      workoutId: null,
      exerciseDto: {},
    });
    const filter = reactive({
      selectedFav: false,
      selectedUnilateral: null,
      selectedLoadType: null,
      selectedMuscleSubGroups: [],
    });

    const route = useRoute();
    const muscleGroupId = route.params.muscleGroupId;
    const setGroupId = route.query.setGroupId;
    const workoutId = route.query.workoutId;
    onBeforeMount(async () => {
      EnumService.getAll().then((res) => {
        loadTypes.value = res;
      });
      MuscleGroupService.getMuscleGroup(muscleGroupId).then((res) => {
        for (const key of Object.keys(res)) muscleGroup[key] = res[key];
      });
      loadExercises();
      if (setGroupId) {
        SetGroupService.getById(setGroupId).then((res) => {
          for (const key of Object.keys(res)) setGroup[key] = res[key];
        });
      }
      if (workoutId) {
        WorkoutService.getById(workoutId).then((res) => {
          for (const key of Object.keys(res)) workout[key] = res[key];
        });
      }
    });

    watchEffect(() => {
      loadExercises(filter);
    });

    function loadExercises() {
      ExerciseService.getAll({
        unilateral: filter.selectedUnilateral,
        loadType: filter.selectedLoadType,
        muscleGroupIds: muscleGroupId,
      }).then((res) => {
        exercises.value = res;
      });
    }

    const router = useRouter();
    async function addExercise(exerciseId) {
      setGroup.exerciseId = exerciseId;
      if (setGroup.id) {
        await SetGroupService.update(setGroup.id, setGroup);
      } else {
        setGroup.workoutId = workoutId;
        await SetGroupService.createInWorkout(workoutId, setGroup);
      }
      router.push({
        path: "/",
        query: { date: moment(workout.date).format("YYYY/MM/DD") },
      });
    }

    return {
      loadTypes,
      exercises,
      muscleGroup,
      workout,
      setGroup,
      filter,
      moment,
      addExercise,
    };
  },
});
</script>

<style scoped>
.maxAncho {
  width: 100% !important;
}
</style>
