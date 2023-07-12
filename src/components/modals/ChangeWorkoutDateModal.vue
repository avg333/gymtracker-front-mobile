<template>
  <q-card>
    <q-card-section>
      <div class="row text-h6">
        {{ $t("modal.changeWorkoutDate.moveWorkout") }}
      </div>
      <div class="text-subtitle3 text-grey">
        {{ $t("modal.changeWorkoutDate.from") }}
        <strong> {{ state.workout?.date }}</strong>
        {{ $t("modal.changeWorkoutDate.to") }}
        <strong> {{ state.date }}</strong>
      </div>

      <q-date mask="YYYY-MM-DD" v-model="state.date" :locale="{
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
      }" first-day-of-week="1" no-unset :years-in-month-view="true"
        :events="Object.keys(state.workoutDates).map((el) => dateToBars(el))" minimal flat />

      <div v-if="state.isDateInWorkoutDates" class="text-center">
        {{ $t("modal.changeWorkoutDate.existsWorkout") }}
      </div>
    </q-card-section>

    <q-card-actions>
      <q-space />
      <q-btn flat v-close-popup>
        {{ $t("modal.changeWorkoutDate.cancel") }}
      </q-btn>
      <q-btn flat class="text-positive" :disabled="state.isDateInWorkoutDates" @click="changeDate">
        {{ $t("modal.changeWorkoutDate.move") }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { reactive, computed, onBeforeMount } from 'vue';
import { useLoginStore } from 'stores/login-store';
import WorkoutService from 'src/services/workouts-api/WorkoutService';
import { dateToBars } from 'src/utils/dateFormater'; //TODO Descubrir como eliminar esta conversion
import { GetWorkoutIdAndDateResponse, GetWorkoutResponseWithDetails } from 'src/types/workouts-api/WorkoutServiceTypes';

const emit = defineEmits(['closeModal']);
const props = defineProps({
  workoutId: { type: String, required: true },
  initialDate: { type: String, required: true }
});
const useStore = useLoginStore();

const state: State = reactive({
  date: props.initialDate,
  workoutDates: { workoutsDateAndId: {} },
  workout: null,
  isDateInWorkoutDates: computed(() => state.workoutDates.workoutsDateAndId[state.date]) != null,
});

interface State {
  date: string,
  workoutDates: GetWorkoutIdAndDateResponse,
  workout: GetWorkoutResponseWithDetails | null,
  isDateInWorkoutDates: boolean,
}

onBeforeMount(() => {
  WorkoutService.getByIdWithDetails(props.workoutId).then((res) => {
    state.workout = res;
  });

  WorkoutService.getAllWorkoutDatesByUser(useStore.getUserId, null).then(
    (res) => {
      state.workoutDates = res;
    }
  );
});

async function changeDate() {
  if (!state.workout) {
    console.error('El workout es null!!')
    return
  }

  state.workout.date = state.date;
  await WorkoutService.updateDate(props.workoutId, state.date);
  emit('closeModal');
}
</script>
