<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title>{{ $t("exercises") }}</q-toolbar-title>
        <q-space />
        <q-btn-group flat>
          <q-btn flat dense round icon="add" />
        </q-btn-group>
      </q-toolbar>
      <q-toolbar v-if="setGroup.id">
        <span>
          {{
            $t("replaceExerciseInWorkout", {
              exerciseName: setGroup.exerciseDto?.name,
            })
          }}
        </span>
      </q-toolbar>
      <q-toolbar v-else-if="workout.id">
        <span>
          {{
            $t("addExerciseToWorkout", {
              date: moment(workout.date).format("YYYY/MM/DD"),
            })
          }}
        </span>
      </q-toolbar>
    </div>
    <MuscleSupGroupCard
      v-for="muscleSupGroup in muscleSupGroups"
      :key="muscleSupGroup.id"
      :muscleSupGroup="muscleSupGroup"
      @click="
        $router.push({
          path: '/muscleSupGroups/' + muscleSupGroup.id + '/muscleGroups',
          query: $route.query,
        })
      "
    />
  </q-page>
</template>

<script>
import moment from "moment";
import { defineComponent, ref, reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import MuscleSupGroupCard from "src/components/cards/MuscleSupGroupCard.vue";
import MuscleGroupService from "src/services/MuscleGroupService";
import SetGroupService from "src/services/SetGroupService";
import WorkoutService from "src/services/WorkoutService";
export default defineComponent({
  name: "MuscleSupGroupsPage",
  components: { MuscleSupGroupCard },
  setup() {
    const muscleSupGroups = ref([]);
    const setGroup = reactive({});
    const workout = reactive({});

    const route = useRoute();
    const setGroupId = route.query.setGroupId;
    const workoutId = route.query.workoutId;
    onBeforeMount(async () => {
      MuscleGroupService.getAllMuscleSupGroups().then((res) => {
        muscleSupGroups.value = res;
      });
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

    return { muscleSupGroups, setGroup, workout, moment };
  },
});
</script>
