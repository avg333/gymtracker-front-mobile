<template>
  <q-card>
    <q-card-section>
      <q-date
        class="ancho"
        v-model="date"
        :years-in-month-view="true"
        :events="workoutDates"
        minimal
        flat
      />
      <span v-if="workoutDates.includes(date)">
        Ya hay un entrenamiento ese dia
      </span>
    </q-card-section>
    <q-card-actions>
      <q-space />
      <q-btn flat v-close-popup>CANCEL</q-btn>
      <q-btn
        flat
        :disabled="workoutDates.includes(date)"
        class="text-positive"
        @click="workoutDates.includes(date) ? null : changeDate()"
      >
        MOVE
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
    const date = ref(true);
    const workoutDates = ref([]);
    const workout = reactive({});

    const useStore = useLoginStore();
    onBeforeMount(() => {
      WorkoutService.getAllDatesFromUser(useStore.getUserId).then((res) => {
        workoutDates.value = res.map((fecha) =>
          moment(fecha).format("YYYY/MM/DD")
        );
      });
      WorkoutService.getById(props.workoutId).then((res) => {
        for (const key of Object.keys(res)) workout[key] = res[key];
        date.value = moment(res.date).format("YYYY/MM/DD");
      });
    });

    async function changeDate() {
      workout.date = moment(date.value).format("YYYY-MM-DD");
      await WorkoutService.update(workout.id, workout);
      emit("closeModal");
    }

    return { date, workoutDates, workout, changeDate };
  },
};
</script>
