<template>
  <q-card>
    <q-card-section>
      <div class="row text-h6">
        {{ $t("modal.changeWorkoutDate.moveWorkout") }}
      </div>
      <div class="text-subtitle3 text-grey">
        {{ $t("modal.changeWorkoutDate.from") }}
        <strong> {{ dateToBars(workout.date) }}</strong>
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
import { ref, reactive, onBeforeMount } from "vue";
import { useLoginStore } from "stores/login-store";
import WorkoutService from "src/services/WorkoutService";
import { dateToISO8601, dateToBars } from "../../utils/dateFormater";
export default {
  name: "ChangeWorkoutDateModal",
  props: {
    workoutId: {
      type: Number,
      required: true,
    },
    initialDate: {
      type: String,
    },
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const useStore = useLoginStore();

    const date = ref(props.initialDate);

    const workoutDates = ref([]);
    const workout = reactive({});

    // TODO Crear un unico existsWorkout

    onBeforeMount(() => {
      WorkoutService.getById(props.workoutId).then((res) => {
        if (res) {
          for (const key of Object.keys(res)) workout[key] = res[key];
        }
      });

      WorkoutService.getAllWorkoutDatesByUser(useStore.getUserId).then(
        (res) => {
          workoutDates.value = res.map((dateTemp) => dateToBars(dateTemp));
        }
      );
    });

    async function changeDate() {
      workout.date = dateToISO8601(date.value);
      await WorkoutService.update(workout.id, workout);
      emit("closeModal");
      //TODO Mover a la fecha destino?
    }

    return { date, workoutDates, workout, changeDate, dateToBars };
  },
};
</script>
