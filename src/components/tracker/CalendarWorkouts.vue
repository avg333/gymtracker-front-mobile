<template>
  <q-slide-transition>
    <q-date v-show="showCalendar" class="ancho" mask="YYYY-MM-DD" :locale="{
      days: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ],
      daysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      months: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthsShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
    }" first-day-of-week="1" no-unset :events="Object.keys(workoutDates).map((el) => dateToBars(el))" v-model="date"
      :years-in-month-view="true" minimal flat />
  </q-slide-transition>
</template>

<script setup lang="ts">
//READY!
import { ref, onBeforeMount, watch } from 'vue';
import type { Ref } from 'vue'
import { useRouter } from 'vue-router';
import { useLoginStore } from 'stores/login-store';
import WorkoutService from 'src/services/workouts-api/WorkoutService';
import { dateToBars, dateToISO8601 } from 'src/utils/dateFormater';
import { GetWorkoutIdAndDateResponse } from 'src/types/workouts-api/WorkoutServiceTypes';

const props = defineProps({
  showCalendar: { type: Boolean, required: true },
  defaultDate: { type: String, required: false },
  exerciseId: { type: String, required: false },
  updateDateQuery: { type: Boolean, required: true }
});
const emit = defineEmits(['updateDate', 'updateWorkoutId'])


const useStore = useLoginStore();
const router = useRouter();

const date = ref(props.defaultDate ? props.defaultDate : dateToISO8601(null));
const workoutDates: Ref<GetWorkoutIdAndDateResponse> = ref({});
const workoutId = ref('');

watch(date, () => {
  if (props.updateDateQuery) {
    router.replace({ query: { date: date.value } });
  }
  setWorkoutId();
  emit('updateDate', date.value);
});

watch(workoutId, () => {
  emit('updateWorkoutId', workoutId.value);
});

onBeforeMount(() => {
  emit('updateDate', date.value);
  getWorkoutsDates();
});

function getWorkoutsDates() {
  if (props.exerciseId) {
    WorkoutService.getAllWorkoutDatesByUser(
      useStore.getUserId,
      props.exerciseId
    ).then((dates) => {
      workoutDates.value = dates;
      setWorkoutId();
    });
  } else {
    WorkoutService.getAllWorkoutDatesByUser(useStore.getUserId, null).then(
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

function setToday() {
  date.value = dateToISO8601(null);
}
defineExpose({ getWorkoutsDates, setToday })
</script>

<style scoped>
.ancho {
  width: 100%;
}
</style>
