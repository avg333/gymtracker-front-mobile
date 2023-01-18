<template>
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
</template>

<script>
import { ref, reactive, onBeforeMount, watchEffect } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import WorkoutService from "src/services/WorkoutService";
import { useLoginStore } from "stores/login-store";
export default {
  props: {
    showCalendar: Boolean,
    defaultDate: String,
    updateWorkoutDates: String,
    exerciseId: Number,
  },
  emits: ["updateDate", "updateWorkout"],
  setup(props, { emit, expose }) {
    const today = moment().format("YYYY/MM/DD");
    const useStore = useLoginStore();
    const router = useRouter();

    const date = ref(props.defaultDate ? props.defaultDate : today);
    const workoutDates = ref([]);
    let workoutDatesAux = [];

    const workout = reactive({ date: today });

    // Cuando se cambia la fecha, la actualiza en el padre
    watchEffect(() => {
      //router.replace({ query: { date: date.value } }); //FIXME Esto da problemas
      emit("updateDate", date.value);
      getDateWorkout(date.value);
    });

    // Cuando se obtiene un workout, lo actualiza en el padre
    watchEffect(() => {
      emit("updateWorkout", workout);
    });

    onBeforeMount(() => {
      getWorkoutsDates();
      getDateWorkout(date.value, true);
      emit("updateDate", date.value);
    });

    function getDateWorkout(workoutDate, force) {
      if (
        !force &&
        !workoutDatesAux.find(
          (woDate) => woDate == moment(workoutDate).format("YYYY/MM/DD")
        )
      ) {
        cleanWorkout();
        return;
      }

      WorkoutService.getWorkoutsByUserAndDate(
        useStore.getUserId,
        moment(workoutDate).format("YYYY-MM-DD")
      ).then((res) => {
        if (res && res.length && res[0] && res[0].id) {
          for (const key of Object.keys(res[0])) workout[key] = res[0][key];
          return;
        }
        cleanWorkout();
      });
    }

    function getWorkoutsDates() {
      if (props.exerciseId) {
        WorkoutService.getAllWorkoutDatesWithExerciseByUser(
          useStore.getUserId,
          props.exerciseId
        ).then((dates) => processWorkoutDates(dates));
      } else {
        WorkoutService.getAllWorkoutDatesByUser(useStore.getUserId).then(
          (dates) => processWorkoutDates(dates)
        );
      }
    }

    function processWorkoutDates(dates) {
      if (dates && dates.length) {
        workoutDatesAux = dates.map((tempDate) =>
          moment(tempDate).format("YYYY/MM/DD")
        );
        workoutDates.value = workoutDatesAux;
      }
    }

    function setDate(dateValue) {
      date.value = dateValue;
    }

    function cleanWorkout() {
      workout.id = null;
      workout.description = null;
      workout.date = moment(date.value).format("YYYY/MM/DD");
    }

    expose({
      getWorkoutsDates,
      getDateWorkout,
      setDate,
    });

    return { date, workoutDates };
  },
};
</script>

<style scoped>
.ancho {
  width: 100%;
}
</style>
