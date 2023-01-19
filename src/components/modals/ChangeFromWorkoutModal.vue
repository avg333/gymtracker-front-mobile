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
            (!exerciseId && !state.workout?.id)
          "
          @click="copiar"
        >
          Copiar{{ state.setGroupSourceId }}
        </q-btn>
      </div>

      <div class="text-subtitle3 text-grey">
        {{ $t("modal.changeWorkoutDate.from") }}
        <strong> {{ state.date }}</strong>
        {{ $t("modal.changeWorkoutDate.to") }}
        <strong> {{ state.workoutDestination.date }}</strong>
      </div>

      <CalendarWorkouts
        :showCalendar="state.showCalendar"
        :exerciseId="exerciseId ? exerciseId : null"
        @updateDate="updateDate"
        @updateWorkout="updateWorkout"
      />

      <q-separator />

      <SetGroupsContainer
        :onlyRead="true"
        :workout="state.workout"
        :showSummary="true"
        :exerciseId="exerciseId ? exerciseId : null"
      />
    </q-card-section>
  </q-card>
</template>

<script>
//TODO Mejorar HTML
import { defineComponent, reactive, onBeforeMount, watchEffect } from "vue";
import { useRouter } from "vue-router";
import SetGroupsContainer from "components/tracker/SetGroupsContainer.vue";
import CalendarWorkouts from "components/tracker/CalendarWorkouts.vue";
import WorkoutService from "src/services/WorkoutService";
import SetGroupService from "src/services/SetGroupService";
import ExerciseService from "src/services/ExerciseService";
import { dateToISO8601 } from "../../utils/dateFormater";
export default defineComponent({
  name: "CopyFromWorkout",
  props: { exerciseId: Number, setGroupId: Number, workoutId: Number },
  components: { SetGroupsContainer, CalendarWorkouts },
  setup(props) {
    const router = useRouter();

    const state = reactive({
      showCalendar: true,
      date: dateToISO8601(),
      workout: {},
      workoutDestination: {},
      exercise: {},
      setGroupSourceId: null,
    });

    onBeforeMount(() => {
      if (props.exerciseId) {
        ExerciseService.getById(props.exerciseId).then((res) => {
          state.exercise = res;
        });
      }
      if (props.workoutId) {
        WorkoutService.getById(props.workoutId).then((res) => {
          state.workoutDestination = res;
        });
      }
    });

    watchEffect(() => {
      state.setGroupSourceId = null;
      if (!props.exerciseId || !state.workout?.setGroups?.length) {
        return;
      }

      const setGroupSource = state.workout.setGroups
        .reverse()
        .find(
          (element) =>
            element?.exercise?.id == props.exerciseId &&
            element?.id != props.setGroupId
        );

      state.setGroupSourceId = setGroupSource?.id ? setGroupSource.id : null;
    });

    async function copiar() {
      props.setGroupId
        ? await SetGroupService.replaceSetGroupSetsWithSetGroup(
            props.setGroupId,
            state.setGroupSourceId
          )
        : await WorkoutService.copySetGroupsFromWorkoutToWorkout(
            props.workoutId,
            state.workout.id
          );
      router.back();
    }

    function updateWorkout(workoutValue) {
      state.workout = workoutValue;
    }
    function updateDate(dateCalendar) {
      state.date = dateCalendar;
    }

    return { state, copiar, updateWorkout, updateDate };
  },
});
</script>
