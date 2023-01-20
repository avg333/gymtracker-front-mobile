<template>
  <q-card>
    <q-card-section>
      <div class="row text-h6">
        Copiar entreno
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
            (exerciseId && !state.setGroupSourceId) ||
            (!exerciseId && !state.workoutSource?.id)
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
//TODO Mejorar HTML
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
    exerciseId: Number,
    setGroupId: Number,
    workoutId: Number,
    defaultDate: String,
  },
  components: { SetGroupsContainer, CalendarWorkouts },
  setup(props, { emit }) {
    const state = reactive({
      showCalendar: true,
      date: dateToISO8601(),
      workoutSource: {},
      workoutDestination: {},
      exercise: {},
      setGroupSourceId: null,
    });

    onBeforeMount(() => {
      //Obtenemos los datos del ejercicio de las setgroups
      if (props.exerciseId) {
        ExerciseService.getById(props.exerciseId).then((res) => {
          state.exercise = res;
        });
      }
      //Obtenemos los datos del workout destino
      if (props.workoutId) {
        WorkoutService.getById(props.workoutId).then((res) => {
          state.workoutDestination = res;
        });
      }
    });

    async function copiar() {
      props.setGroupId
        ? await SetGroupService.replaceSetGroupSetsWithSetGroup(
            props.setGroupId,
            state.setGroupSourceId
          )
        : await WorkoutService.copySetGroupsFromWorkoutToWorkout(
            props.workoutId,
            state.workoutSource.id
          );
      emit("closeModal");
    }

    function updateWorkoutId(idWorkout) {
      WorkoutService.getById(idWorkout).then((res) => {
        state.workoutSource = res;
      });
      if (!props.exerciseId) {
        return;
      }
      SetGroupService.getAllWorkoutSetGroups(idWorkout).then((res) => {
        state.setGroupSourceId = res
          .reverse()
          .find(
            (element) =>
              element?.exercise?.id == props.exerciseId &&
              element?.id != props.setGroupId
          )?.id;
      });
    }
    function updateDate(dateCalendar) {
      state.date = dateCalendar;
    }

    return { state, copiar, updateWorkoutId, updateDate };
  },
});
</script>
