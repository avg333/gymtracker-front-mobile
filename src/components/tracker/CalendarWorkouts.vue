<template>
  <q-slide-transition>
    <div class="row text-center ancho" v-show="showCalendar">
      <div class="col-12">
        <q-date
          class="ancho"
          v-model="date"
          :events="state.workoutDates"
          :years-in-month-view="true"
          minimal
          flat
        />
      </div>
    </div>
  </q-slide-transition>
</template>

<script>
import { ref, reactive, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import WorkoutService from "src/services/WorkoutService";
import { useLoginStore } from "stores/login-store";
import { dateToISO8601, dateToBars } from "../../utils/dateFormater";
export default {
  props: {
    showCalendar: Boolean,
    defaultDate: String,
    updateWorkoutDates: String,
    exerciseId: Number,
  },
  emits: ["updateDate", "updateWorkout"],
  setup(props, { emit, expose }) {
    const useStore = useLoginStore();
    const router = useRouter(); //FIXME El date de la query deberia actualizarse al cambiar la fecha

    let workoutDatesAux = []; //TODO Eliminar esto cuando se sepa como

    const date = ref(props.defaultDate ? props.defaultDate : dateToBars());
    const workoutId = ref(null);

    const state = reactive({
      workout: {},
      workoutDates: [],
    });

    watch(date, () => {
      emit("updateDate", date.value);
      getDateWorkout(date.value);
    });

    watch(workoutId, () => {
      emit("updateWorkout", state.workout);
    });

    onBeforeMount(() => {
      getWorkoutsDates();
      getDateWorkout(date.value, true);
      emit("updateDate", date.value);
    });

    function getDateWorkout(workoutDate, force) {
      if (
        workoutDate ||
        (!force &&
          !workoutDatesAux.find((woDate) => woDate == dateToBars(workoutDate)))
      ) {
        state.workout = {};
        workoutId.value = state.workout?.id;
        return;
      }

      WorkoutService.getWorkoutsByUserAndDate(
        useStore.getUserId,
        dateToISO8601(workoutDate)
      ).then((res) => {
        state.workout = res?.length && res[0]?.id ? res[0] : {};
        workoutId.value = state.workout?.id;
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
      workoutDatesAux = dates?.length
        ? dates.map((tempDate) => dateToBars(tempDate))
        : [];
      state.workoutDates = workoutDatesAux;
    }

    function setDate(dateValue) {
      date.value = dateValue;
    }

    expose({
      getWorkoutsDates,
      getDateWorkout,
      setDate,
    });

    return { state, date };
  },
};
</script>

<style scoped>
.ancho {
  width: 100%;
}
</style>
