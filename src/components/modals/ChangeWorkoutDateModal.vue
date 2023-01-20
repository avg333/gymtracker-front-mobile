<template>
  <q-card>
    <q-card-section>
      <div class="row text-h6">
        {{ $t("modal.changeWorkoutDate.moveWorkout") }}
      </div>
      <div class="text-subtitle3 text-grey">
        {{ $t("modal.changeWorkoutDate.from") }}
        <strong> {{ state.workout.date }}</strong>
        {{ $t("modal.changeWorkoutDate.to") }}
        <strong> {{ state.date }}</strong>
      </div>

      <q-date
        mask="YYYY-MM-DD"
        v-model="state.date"
        :years-in-month-view="true"
        :events="Object.keys(state.workoutDates).map((el) => dateToBars(el))"
        minimal
        flat
      />

      <div v-if="state.isDateInWorkoutDates" class="text-center">
        {{ $t("modal.changeWorkoutDate.existsWorkout") }}
      </div>
    </q-card-section>

    <q-card-actions>
      <q-space />
      <q-btn flat v-close-popup>
        {{ $t("modal.changeWorkoutDate.cancel") }}
      </q-btn>
      <q-btn
        flat
        class="text-positive"
        :disabled="state.isDateInWorkoutDates"
        @click="changeDate"
      >
        {{ $t("modal.changeWorkoutDate.move") }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
//READY
import { reactive, computed, onBeforeMount } from "vue";
import { useLoginStore } from "stores/login-store";
import WorkoutService from "src/services/WorkoutService";
import { dateToBars } from "../../utils/dateFormater";
export default {
  name: "ChangeWorkoutDateModal",
  emits: ["closeModal"],
  props: {
    workoutId: {
      type: Number,
      required: true,
    },
    initialDate: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const useStore = useLoginStore();

    const state = reactive({
      date: props.initialDate,
      workoutDates: [],
      workout: {},
      isDateInWorkoutDates: computed(() => state.workoutDates[state.date]),
    });

    onBeforeMount(() => {
      WorkoutService.getById(props.workoutId).then((res) => {
        state.workout = res;
      });

      WorkoutService.getAllWorkoutDatesByUser(useStore.getUserId).then(
        (res) => {
          state.workoutDates = res;
        }
      );
    });

    async function changeDate() {
      state.workout.date = state.date;
      await WorkoutService.update(props.workoutId, state.workout);
      emit("closeModal");
    }

    return { state, changeDate, dateToBars };
  },
};
</script>
