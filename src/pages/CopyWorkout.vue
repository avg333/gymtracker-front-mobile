<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title> Copiar entreno </q-toolbar-title>
        <q-btn
          v-if="$route.query.exerciseId"
          flat
          dense
          round
          icon="today"
          :disabled="!setGroupSourceId"
          @click="copiarSetGroup"
        >
          Copiar
        </q-btn>
        <q-btn
          v-else
          flat
          dense
          round
          icon="today"
          :disabled="!workout || (workout && !workout.id)"
          @click="copiarEntreno"
        >
          Copiar
        </q-btn>
      </q-toolbar>
      <q-toolbar>
        <q-toolbar-title> {{ date }} </q-toolbar-title>
        <q-space />
        <q-btn-group flat>
          <q-btn
            flat
            dense
            round
            :color="showCalendar ? 'positive' : ''"
            icon="date_range"
            @click="showCalendar = !showCalendar"
          />
        </q-btn-group>
      </q-toolbar>
    </div>

    <q-slide-transition>
      <div class="row text-center ancho" v-show="showCalendar">
        <div class="col-12">
          <q-date
            class="ancho"
            v-model="date"
            :events="workoutDates"
            :years-in-month-view="true"
            minimal
            flat
          />
        </div>
      </div>
    </q-slide-transition>

    <SetGroupsContainer
      :onlyRead="true"
      :workout="workout"
      :showSummary="true"
      :exerciseId="
        $route.query.exerciseId ? Number($route.query.exerciseId) : null
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
import { useLoginStore } from "stores/login-store";
import WorkoutService from "src/services/WorkoutService";
import SetGroupService from "src/services/SetGroupService";
import SetGroupsContainer from "src/components/tracker/SetGroupsContainer.vue";
export default defineComponent({
  name: "MuscleGroupPage",
  components: { SetGroupsContainer },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const showCalendar = ref(true);
    const useStore = useLoginStore();

    const today = moment().format("YYYY/MM/DD");
    const date = ref(today);

    const workoutDates = ref([]);
    const workout = reactive({ date: moment().format("YYYY/MM/DD") });

    const setGroupSourceId = ref(null);

    onBeforeMount(() => {
      getWorkouts();
    });

    watchEffect(() => {
      date.value;
      getWorkouts();
    });

    function getWorkouts() {
      setGroupSourceId.value = null;
      if (route.query.exerciseId) {
        WorkoutService.getUserWorkoutsWithExercise(
          useStore.getUserId,
          route.query.exerciseId
        ).then((res) => {
          workoutDates.value = res.map((wo) =>
            moment(wo.date).format("YYYY/MM/DD")
          );
          const workoutBd = res.find(
            (wo) =>
              wo.date &&
              date.value &&
              moment(wo.date).format("YYYY/MM/DD") === date.value
          );
          if (workoutBd) {
            for (const key of Object.keys(workoutBd))
              workout[key] = workoutBd[key];
          } else {
            workout.id = null;
            workout.description = null;
            workout.date = moment(date.value).format("YYYY/MM/DD");
          }

          if (
            route.query.exerciseId &&
            workoutBd &&
            workoutBd.setGroups &&
            workoutBd.setGroups.length
          ) {
            const setGroupsDb = workoutBd.setGroups.reverse();
            const setGroupDb = setGroupsDb.find(
              (element) => element.exercise.id == route.query.exerciseId
            );
            if (setGroupDb && setGroupDb.id) {
              setGroupSourceId.value = setGroupDb.id;
            }
          }
        });
      } else {
        WorkoutService.getAllFromUser(useStore.getUserId).then((res) => {
          workoutDates.value = res.map((wo) =>
            moment(wo.date).format("YYYY/MM/DD")
          );
          const workoutBd = res.find(
            (wo) =>
              wo.date &&
              date.value &&
              moment(wo.date).format("YYYY/MM/DD") === date.value
          );
          if (workoutBd) {
            for (const key of Object.keys(workoutBd))
              workout[key] = workoutBd[key];
          } else {
            workout.id = null;
            workout.description = null;
            workout.date = moment(date.value).format("YYYY/MM/DD");
          }

          if (
            route.query.exerciseId &&
            workoutBd &&
            workoutBd.setGroups &&
            workoutBd.setGroups.length
          ) {
            const setGroupsDb = workoutBd.setGroups.reverse();
            const setGroupDb = setGroupsDb.find(
              (element) => element.exercise.id == route.query.exerciseId
            );
            if (setGroupDb && setGroupDb.id) {
              setGroupSourceId.value = setGroupDb.id;
            }
          }
        });
      }
    }

    async function copiarSetGroup() {
      await SetGroupService.replaceSetGroupSetsWithSetGroup(
        route.query.setGroupId,
        setGroupSourceId.value
      );
      router.back();
    }

    async function copiarEntreno() {
      await WorkoutService.addSetGroupsToWorkoutFromWorkout(
        route.query.workoutId,
        workout.id
      );
      router.back();
    }

    return {
      showCalendar,
      date,
      workout,
      workoutDates,
      copiarEntreno,
      copiarSetGroup,
      setGroupSourceId,
    };
  },
});
</script>

<style scoped>
.maxAncho {
  width: 100% !important;
}
</style>
