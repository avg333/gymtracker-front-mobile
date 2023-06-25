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
          <q-btn flat dense round :color="state.showCalendar ? 'positive' : ''" icon="date_range"
            @click="state.showCalendar = !state.showCalendar" />
        </q-btn-group>
      </div>

      <div class="text-subtitle3 text-grey">
        {{ $t("modal.changeWorkoutDate.from") }}
        <strong> {{ state.date }}</strong>
        {{ $t("modal.changeWorkoutDate.to") }}
        <strong> {{ state.workoutDestination?.date }}</strong>
      </div>

      <CalendarWorkouts :showCalendar="state.showCalendar" :exerciseId="exerciseId" :defaultDate="defaultDate"
        @updateDate="updateDate" @updateWorkoutId="updateWorkoutId" />

      <q-separator />

      <q-scroll-area style="height: 300px">
        <SetGroupsContainer :onlyRead="true" :workoutId="state.workoutSource?.id"
          :exerciseId="state.setGroupDestination?.exerciseId" />
      </q-scroll-area>
    </q-card-section>

    <q-card-actions>
      <q-space />
      <q-btn flat v-close-popup>
        {{ $t("modal.changeWorkoutDate.cancel") }}
      </q-btn>
      <q-btn flat dense round icon="today" :disabled="!state.workoutSource?.id" @click="copiar">
        {{ $t("modal.changeFromWorkoutModal.copy") }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue';
import SetGroupsContainer from 'components/tracker/SetGroupsContainer.vue';
import CalendarWorkouts from 'components/tracker/CalendarWorkouts.vue';
import WorkoutService from 'src/services/workouts-api/WorkoutService';
import SetGroupService from 'src/services/workouts-api/SetGroupService';
import { GetSetGroupResponse } from 'src/types/workouts-api/SetGroupServiceTypes';
import { GetWorkoutResponse } from 'src/types/workouts-api/WorkoutServiceTypes';
const emit = defineEmits(['closeModal']);
const props = defineProps({
  workoutId: { type: String, required: true },
  defaultDate: { type: String, required: true },
  setGroupId: { type: String, required: false },
  exerciseId: { type: String, required: false },
});

const state: State = reactive({
  showCalendar: true,
  date: props.defaultDate,
  workoutDestination: null,
  workoutSource: null,
  setGroupDestination: null,
  setGroupSource: null,
});
interface State {
  showCalendar: boolean,
  date: string,
  workoutDestination: GetWorkoutResponse | null,
  workoutSource: GetWorkoutResponse | null,
  setGroupDestination: GetSetGroupResponse | null,
  setGroupSource: GetSetGroupResponse | null,
}

onBeforeMount(() => {
  if (props.setGroupId) {
    SetGroupService.getById(props.setGroupId).then((setGroup) => {
      state.setGroupDestination = setGroup;
      if (setGroup) {
        WorkoutService.getById(setGroup.workout.id).then((workout) => {
          state.workoutDestination = workout;
        });
      }
    });
  }
  WorkoutService.getById(props.workoutId).then((workout) => {
    state.workoutDestination = workout;
  });
});

async function copiar() {
  if (props.setGroupId) {
    if (state.setGroupDestination && state.setGroupSource) {
      await SetGroupService.replaceSetGroupSetsWithSetGroup(
        state.setGroupDestination.id,
        state.setGroupSource.id)
    } else {
      console.error('Los setGroups Source y Destination son null!')
    }
  } else {
    if (state.workoutDestination && state.workoutSource) {
      await WorkoutService.copySetGroupsFromWorkoutToWorkout(
        state.workoutDestination.id,
        state.workoutSource.id)
    } else {
      console.error('Los workouts Source y Destination son null!')
    }
  }
  emit('closeModal');
}

function findSetGroupSourceInWorkout(workout: GetWorkoutResponse) {
  if (!workout?.setGroups?.length) {
    state.setGroupSource = null;
    return;
  }

  const setGroupsAux = workout.setGroups.reverse()
    .find(
      (setGroupSource) =>
        setGroupSource?.exercise?.id ===
        state.setGroupDestination?.exerciseId &&
        setGroupSource?.id !== props.setGroupId
    )

  if (setGroupsAux) {
    state.setGroupSource = { ...setGroupsAux, exerciseId: setGroupsAux.exercise.id, workout: { id: workout.id } }
  } //TODO Hacer esto mas elegante
}

function updateWorkoutId(idWorkout: string | null) {
  if (!idWorkout) {
    state.workoutSource = null;
    state.setGroupSource = null;
    return;
  }

  WorkoutService.getById(idWorkout).then((workoutSource) => {
    state.workoutSource = workoutSource;
    if (props.setGroupId && workoutSource) {
      findSetGroupSourceInWorkout(workoutSource);
    }
  });
}
function updateDate(dateCalendar: string) {
  state.date = dateCalendar;
}
</script>
