<template>
  <q-card>
    <q-card-section>
      <div class="row text-h6">
        {{
          setGroupId
            ? $t("modal.changeFromWorkoutModal.copySets")
            : $t("modal.changeFromWorkoutModal.copyWorkout")
        }}
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

      <q-scroll-area style="height: 300px">
        <SetGroupsContainer
          :onlyRead="true"
          :workoutId="state.workoutSource?.id"
          :exerciseId="state.setGroupDestination?.exercise?.id"
        />
      </q-scroll-area>
    </q-card-section>

    <q-card-actions>
      <q-space />
      <q-btn flat v-close-popup>
        {{ $t("modal.changeWorkoutDate.cancel") }}
      </q-btn>
      <q-btn
        flat
        dense
        round
        icon="today"
        :disabled="!state.workoutSource?.id"
        @click="copiar"
      >
        {{ $t("modal.changeFromWorkoutModal.copy") }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
//READY!
import { defineComponent, reactive, onBeforeMount } from "vue";
import SetGroupsContainer from "components/tracker/SetGroupsContainer.vue";
import CalendarWorkouts from "components/tracker/CalendarWorkouts.vue";
import WorkoutService from "src/services/WorkoutService";
import SetGroupService from "src/services/SetGroupService";
export default defineComponent({
  name: "ChangeFromWorkoutModal",
  emits: ["closeModal"],
  props: {
    defaultDate: String,
    setGroupId: Number,
    exerciseId: Number,
    workoutId: Number,
  },
  components: { SetGroupsContainer, CalendarWorkouts },
  setup(props, { emit }) {
    const state = reactive({
      showCalendar: true,
      date: null,
      workoutDestination: {},
      workoutSource: {},
      setGroupDestination: {},
      setGroupSource: {},
    });

    onBeforeMount(() => {
      if (props.setGroupId) {
        SetGroupService.getById(props.setGroupId).then((setGroup) => {
          state.setGroupDestination = setGroup;
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
            state.setGroupDestination.id,
            state.setGroupSource.id
          )
        : await WorkoutService.copySetGroupsFromWorkoutToWorkout(
            state.workoutDestination.id,
            state.workoutSource.id
          );
      emit("closeModal");
    }

    function findSetGroupSourceInWorkout(workout) {
      if (!workout?.setGroups?.length) {
        state.setGroupSource = {};
        return;
      }

      state.setGroupSource = workout.setGroups
        .reverse()
        .find(
          (setGroupSource) =>
            setGroupSource?.exercise?.id ===
              state.setGroupDestination.exercise.id &&
            setGroupSource?.id !== props.setGroupId
        );
    }

    function updateWorkoutId(idWorkout) {
      if (!idWorkout) {
        state.workoutSource = {};
        state.setGroupSource = {};
        return;
      }

      WorkoutService.getById(idWorkout, 1).then((workoutSource) => {
        state.workoutSource = workoutSource;
        if (props.setGroupId) {
          findSetGroupSourceInWorkout(workoutSource);
        }
      });
    }
    function updateDate(dateCalendar) {
      state.date = dateCalendar;
    }

    return { state, copiar, updateWorkoutId, updateDate };
  },
});
</script>
