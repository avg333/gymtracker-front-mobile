<template>
  <q-card>
    <q-card-section>
      <div class="row text-h6">
        {{ $t("modal.changeWorkoutDate.moveWorkout") }}
      </div>
      <div class="text-subtitle3 text-grey">
        {{ $t("modal.changeWorkoutDate.from") }}
        <strong> {{ moment(workout.date).format("YYYY/MM/DD") }}</strong>
        {{ $t("modal.changeWorkoutDate.to") }}
        <strong> {{ date }}</strong>
      </div>

      <q-date
        class="ancho"
        v-model="date"
        :years-in-month-view="true"
        :events="workoutDates"
        minimal
        flat
      />
      <div class="row">
        <div class="col-12 text-center">
          <span v-if="workoutDates.includes(date)">
            {{ $t("modal.changeWorkoutDate.existsWorkout") }}
          </span>
        </div>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-space />
      <q-btn flat v-close-popup>
        {{ $t("modal.changeWorkoutDate.cancel") }}
      </q-btn>
      <q-btn
        flat
        :disabled="workoutDates.includes(date)"
        class="text-positive"
        @click="workoutDates.includes(date) ? null : changeDate()"
      >
        {{ $t("modal.changeWorkoutDate.move") }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import moment from "moment";
import { ref, reactive, onBeforeMount } from "vue";
import { useLoginStore } from "stores/login-store";
import WorkoutService from "src/services/WorkoutService";
export default {
  props: {
    workoutId: {
      type: Number,
    },
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const date = ref(moment().format("YYYY/MM/DD"));
    const workoutDates = ref([]);
    const workout = reactive({});

    const useStore = useLoginStore();
    onBeforeMount(() => {
      WorkoutService.getAllFromUser(useStore.getUserId).then((res) => {
        workoutDates.value = res.map((wo) =>
          moment(wo.date).format("YYYY/MM/DD")
        );
        const workoutBd = res.find((wo) => wo.id === props.workoutId);
        if (workoutBd) {
          date.value = moment(workoutBd.date).format("YYYY/MM/DD");
          for (const key of Object.keys(workoutBd))
            workout[key] = workoutBd[key]; //FIXME Cambiar por =
        }
      });
    });

    async function changeDate() {
      workout.date = moment(date.value).format("YYYY-MM-DD");
      await WorkoutService.update(workout.id, workout);
      emit("closeModal");
    }

    return { date, workoutDates, workout, changeDate, moment };
  },
};
</script>
