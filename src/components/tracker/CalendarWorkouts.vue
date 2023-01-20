<template>
  <q-slide-transition>
    <q-date
      v-show="showCalendar"
      class="ancho"
      mask="YYYY-MM-DD"
      :events="Object.keys(workoutDates).map((el) => dateToBars(el))"
      v-model="date"
      :years-in-month-view="true"
      minimal
      flat
    />
  </q-slide-transition>
</template>

<script>
//READY
import { ref, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import WorkoutService from "src/services/WorkoutService";
import { useLoginStore } from "stores/login-store";
import { dateToBars, dateToISO8601 } from "../../utils/dateFormater";
export default {
  name: "CalendarWorkouts",
  emits: ["updateDate", "updateWorkoutId"],
  props: { showCalendar: Boolean, defaultDate: String, exerciseId: Number },
  setup(props, { emit, expose }) {
    const useStore = useLoginStore();
    const router = useRouter(); //FIXME El date de la query deberia actualizarse al cambiar la fecha

    const date = ref(props.defaultDate ? props.defaultDate : dateToISO8601());
    const workoutDates = ref([]);
    const workoutId = ref(null);

    watch(date, () => {
      setWorkoutId();
      emit("updateDate", date.value);
    });

    watch(workoutId, () => {
      emit("updateWorkoutId", workoutId.value);
    });

    onBeforeMount(() => {
      emit("updateDate", date.value);
      getWorkoutsDates();
    });

    function getWorkoutsDates() {
      if (props.exerciseId) {
        WorkoutService.getAllWorkoutDatesWithExerciseByUser(
          useStore.getUserId,
          props.exerciseId
        ).then((dates) => {
          workoutDates.value = dates;
          setWorkoutId();
        });
      } else {
        WorkoutService.getAllWorkoutDatesByUser(useStore.getUserId).then(
          (dates) => {
            workoutDates.value = dates;
            setWorkoutId();
          }
        );
      }
    }

    function setWorkoutId() {
      workoutId.value = workoutDates.value[date.value];
    }

    function setDate(dateValue) {
      date.value = dateValue;
    }

    expose({
      getWorkoutsDates,
      setDate,
    });

    return { date, workoutDates, dateToBars };
  },
};
</script>

<style scoped>
.ancho {
  width: 100%;
}
</style>
