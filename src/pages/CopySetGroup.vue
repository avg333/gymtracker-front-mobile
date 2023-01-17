<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title> Copiar entreno </q-toolbar-title>
        <q-btn
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
import SetGroupsContainer from "src/components/tracker/SetGroupsContainer.vue";
export default defineComponent({
  name: "MuscleGroupPage",
  components: { SetGroupsContainer },
  setup() {
    const showCalendar = ref(true);
    const useStore = useLoginStore();

    const today = moment().format("YYYY/MM/DD");
    const date = ref(today);

    const workoutDates = ref([]);
    const workout = reactive({ date: moment().format("YYYY/MM/DD") });

    onBeforeMount(() => {
      getWorkouts();
    });

    watchEffect(() => {
      date.value;
      getWorkouts();
    });

    function getWorkouts() {
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
      });
    }

    const route = useRoute();
    const router = useRouter();
    async function copiarEntreno() {
      await WorkoutService.addSetGroupsToWorkoutFromWorkout(
        route.query.workoutId,
        workout.id
      );
      router.push({
        path: "/",
        query: { date: moment(route.query.date).format("YYYY/MM/DD") },
      });
    }

    return { showCalendar, date, workout, workoutDates, copiarEntreno };
  },
});
</script>

<style scoped>
.maxAncho {
  width: 100% !important;
}
</style>
