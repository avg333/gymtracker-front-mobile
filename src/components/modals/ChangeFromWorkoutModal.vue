<template>
  <q-card>
    <q-card-section>
      <div class="row text-h6">
        {{ setGroupId ? "Copiar series" : "Copiar entreno" }}
        <q-space />
        <q-btn-group flat>
          <q-btn
            flat
            dense
            round
            :color="state.showCalendar ? 'positive' : ''"
            icon="date_range"
            @click="state.showCalendar = !state.showCalendar"
          />
        </q-btn-group>
        <q-btn
          flat
          dense
          round
          icon="today"
          :disabled="
            (setGroupId && !state.setGroupSource?.id) ||
            (!setGroupId && !state.workoutSource?.id)
          "
          @click="copiar"
        >
          Copiar
        </q-btn>
      </div>

      <div class="text-subtitle3 text-grey">
        {{ $t("modal.changeWorkoutDate.from") }}
        <strong> {{ state.date }}</strong>
        {{ $t("modal.changeWorkoutDate.to") }}
        <strong> {{ state.workoutDestination?.date }}</strong>
      </div>

      <CalendarWorkouts
        :showCalendar="state.showCalendar"
        :exerciseId="exerciseId"
        :defaultDate="defaultDate"
        @updateDate="updateDate"
        @updateWorkoutId="updateWorkoutId"
      />

      <q-separator />

      <SetGroupsContainer
        :onlyRead="true"
        :workoutId="state.workoutSource?.id"
        :showSummary="true"
        :exerciseId="exerciseId"
      />
    </q-card-section>
  </q-card>
</template>

<script>
//READY
import { defineComponent, reactive, onBeforeMount } from "vue";
import SetGroupsContainer from "components/tracker/SetGroupsContainer.vue";
import CalendarWorkouts from "components/tracker/CalendarWorkouts.vue";
import WorkoutService from "src/services/WorkoutService";
import SetGroupService from "src/services/SetGroupService";
import ExerciseService from "src/services/ExerciseService";
import { dateToISO8601 } from "src/utils/dateFormater";
export default defineComponent({
  name: "CopyFromWorkout",
  props: {
    defaultDate: String,
    // Estos dos cuando se copia un setgroup
    exerciseId: Number,
    setGroupId: Number,
    // Este cuando se copia un workout
    workoutId: Number,
  },
  components: { SetGroupsContainer, CalendarWorkouts },
  setup(props, { emit }) {
    const state = reactive({
      showCalendar: true,
      date: dateToISO8601(),
      workoutSource: {},
      workoutDestination: {},
      exercise: {},
      setGroupDestination: {},
      setGroupSource: null,
    });

    onBeforeMount(() => {
      if (props.exerciseId) {
        SetGroupService.getById(props.setGroupId).then((setGroup) => {
          state.setGroupDestination = setGroup;
          if (setGroup?.exercise?.id) {
            ExerciseService.getById(setGroup.exercise.id).then((res) => {
              state.exercise = res;
            });
          }
          if (setGroup?.workout?.id) {
            WorkoutService.getById(setGroup.workout.id).then((res) => {
              state.workoutDestination = res;
            });
          }
        });
      } else if (props.workoutId) {
        WorkoutService.getById(props.workoutId).then((res) => {
          state.workoutDestination = res;
        });
      }
    });

    async function copiar() {
      props.setGroupId
        ? await SetGroupService.replaceSetGroupSetsWithSetGroup(
            props.setGroupId,
            state.setGroupSource.id
          )
        : await WorkoutService.copySetGroupsFromWorkoutToWorkout(
            props.workoutId,
            state.workoutSource.id
          );
      emit("closeModal");
    }

    function updateWorkoutId(idWorkout) {
      if (!idWorkout) {
        state.workoutSource = {};
        state.setGroupSource = {};
        return;
      }

      WorkoutService.getById(idWorkout).then((res) => {
        state.workoutSource = res;
        if (!props.exerciseId || !state.workoutSource?.setGroups?.length) {
          return;
        }
        state.setGroupSource = state.workoutSource.setGroups
          .reverse()
          .find(
            (element) =>
              element?.exercise?.id == props.exerciseId &&
              element?.id != props.setGroupId
          );
      });
    }
    function updateDate(dateCalendar) {
      state.date = dateCalendar;
    }

    return { state, copiar, updateWorkoutId, updateDate };
  },
});
</script>
