<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title>
          {{ $t("muscleSupGroup." + $route.params.muscleSupGroupId) }}
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
              exerciseName: setGroup.exercise?.name,
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
    </div>
    <MuscleGroupCard
      v-for="muscleGroup in muscleSupGroup.muscleGroups"
      :key="muscleGroup.id"
      :muscleGroup="muscleGroup"
      @click="
        $router.push({
          path:
            '/muscleSupGroups/' +
            muscleSupGroup.id +
            '/muscleGroups/' +
            muscleGroup.id,
          query: $route.query,
        })
      "
    />
  </q-page>
</template>

<script>
import moment from "moment";
import { defineComponent, reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import MuscleGroupCard from "src/components/cards/MuscleGroupCard.vue";
import MuscleGroupService from "src/services/MuscleGroupService";
import SetGroupService from "src/services/SetGroupService";
import WorkoutService from "src/services/WorkoutService";
export default defineComponent({
  name: "MuscleGroupsPage",
  components: { MuscleGroupCard },
  setup() {
    const muscleSupGroup = reactive({});
    const setGroup = reactive({});
    const workout = reactive({});

    const route = useRoute();
    const muscleSupGroupId = route.params.muscleSupGroupId;
    const setGroupId = route.query.setGroupId;
    const workoutId = route.query.workoutId;
    onBeforeMount(async () => {
      MuscleGroupService.getMuscleSupGroup(muscleSupGroupId).then((res) => {
        for (const key of Object.keys(res)) muscleSupGroup[key] = res[key];
      });
      if (setGroupId) {
        SetGroupService.getById(setGroupId).then((res) => {
          for (const key of Object.keys(res)) setGroup[key] = res[key];
        });
      }
      if (workoutId) {
        WorkoutService.getById(workoutId).then((res) => {
          for (const key of Object.keys(res)) workout[key] = res[key]; //FIXME Cambiar por =
        });
      }
    });

    return { muscleSupGroup, setGroup, workout, moment };
  },
});
</script>
