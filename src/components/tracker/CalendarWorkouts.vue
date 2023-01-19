<template>
  <q-slide-transition>
    <q-date
      v-show="showCalendar"
      class="ancho"
      mask="YYYY-MM-DD"
      v-model="date"
      :events="state.workoutDates.map((el) => dateToBars(el))"
      :years-in-month-view="true"
      minimal
      flat
    />
  </q-slide-transition>
</template>

<script>
//READY
import { ref, reactive, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import WorkoutService from "src/services/WorkoutService";
import { useLoginStore } from "stores/login-store";
import { dateToBars, dateToISO8601 } from "../../utils/dateFormater";
export default {
  name: "CalendarWorkouts",
  emits: ["updateDate", "updateWorkout"],
  props: { showCalendar: Boolean, defaultDate: String, exerciseId: Number },
  setup(props, { emit, expose }) {
    const useStore = useLoginStore();
    const router = useRouter(); //FIXME El date de la query deberia actualizarse al cambiar la fecha

    const date = ref(props.defaultDate ? props.defaultDate : dateToISO8601());
    const workoutId = ref(null);

    const state = reactive({
      workout: {},
      workoutDates: [],
    });

    watch(date, () => {
      emit("updateDate", date.value);
      getDateWorkout();
    });

    watch(workoutId, () => {
      emit("updateWorkout", state.workout);
    });

    onBeforeMount(() => {
      getWorkoutsDates();
      getDateWorkout(true);
      emit("updateDate", date.value);
    });

    function getDateWorkout(force) {
      if (
        !force &&
        !state.workoutDates.find((woDate) => woDate == date.value)
      ) {
        state.workout = {};
        workoutId.value = state.workout?.id; //TODO Hacer esto mas elegante
        return;
      }

      WorkoutService.getWorkoutsByUserAndDate(
        useStore.getUserId,
        date.value
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
        ).then((dates) => (state.workoutDates = dates));
      } else {
        WorkoutService.getAllWorkoutDatesByUser(useStore.getUserId).then(
          (dates) => (state.workoutDates = dates)
        );
      }
    }

    function setDate(dateValue) {
      date.value = dateValue;
    }

    expose({
      getWorkoutsDates,
      getDateWorkout,
      setDate,
    });

    return { state, date, dateToBars };
  },
};
</script>

<style scoped>
.ancho {
  width: 100%;
}
</style>
