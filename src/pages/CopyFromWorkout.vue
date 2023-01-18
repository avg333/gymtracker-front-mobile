<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title>
          {{ $route.query.exerciseId ? "Copiar series" : "Copiar entreno" }}
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="today"
          :disabled="
            ($route.query.exerciseId && !state.setGroupSourceId) ||
            (!$route.query.exerciseId && !state.workout?.id)
          "
          @click="$route.query.exerciseId ? copiarSetGroup() : copiarEntreno()"
        >
          Copiar{{ state.setGroupSourceId }}
        </q-btn>
      </q-toolbar>
      <q-toolbar>
        <q-toolbar-title> {{ state.date }} </q-toolbar-title>
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
      </q-toolbar>
    </div>

    <CalendarWorkouts
      ref="calendarRef"
      :showCalendar="state.showCalendar"
      :exerciseId="
        $route.query.exerciseId ? Number($route.query.exerciseId) : null
      "
      @updateDate="updateDate"
      @updateWorkout="updateWorkout"
    />

    <SetGroupsContainer
      :onlyRead="true"
      :workout="state.workout"
      :showSummary="true"
      :exerciseId="
        $route.query.exerciseId ? Number($route.query.exerciseId) : null
      "
    />
  </q-page>
</template>

<script>
//TODO Mejorar HTML
import { defineComponent, reactive, onBeforeMount, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import SetGroupsContainer from "components/tracker/SetGroupsContainer.vue";
import CalendarWorkouts from "components/tracker/CalendarWorkouts.vue";
import WorkoutService from "src/services/WorkoutService";
import SetGroupService from "src/services/SetGroupService";
import ExerciseService from "src/services/ExerciseService";
import { dateToBars } from "../utils/dateFormater";
export default defineComponent({
  name: "CopyFromWorkout",
  components: { SetGroupsContainer, CalendarWorkouts },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      showCalendar: true,
      date: dateToBars(),
      workout: {},
      exercise: {},
      setGroupSourceId: null,
    });

    onBeforeMount(() => {
      if (!route.query.exerciseId) {
        return;
      }
      ExerciseService.getById(route.query.exerciseId).then((res) => {
        state.exercise = res;
      });
    });

    watchEffect(() => {
      const exerciseId = route.query.exerciseId;
      const setGroupLength = state.workout?.setGroups?.length;
      state.setGroupSourceId = null; //FIXME Conseguir que esto se borre al cambiar la fecha

      if (!exerciseId || !setGroupLength) {
        return;
      }

      const setGroupSource = state.workout.setGroups
        .reverse()
        .find(
          (element) =>
            element?.exercise?.id == route.query.exerciseId &&
            element?.id != route.query.setGroupId
        );
      if (setGroupSource?.id) {
        state.setGroupSourceId = setGroupSource.id;
      }
    });

    async function copiarSetGroup() {
      await SetGroupService.replaceSetGroupSetsWithSetGroup(
        route.query.setGroupId,
        state.setGroupSourceId
      );
      router.back();
    }

    async function copiarEntreno() {
      await WorkoutService.copySetGroupsFromWorkoutToWorkout(
        route.query.workoutId,
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

    return {
      state,
      copiarEntreno,
      copiarSetGroup,
      updateWorkout,
      updateDate,
    };
  },
});
</script>
