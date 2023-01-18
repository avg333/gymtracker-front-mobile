<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title> Copiar entreno </q-toolbar-title>
        <q-btn
          v-if="$route.query.exerciseId"
          flat
          dense
          round
          icon="today"
          :disabled="!setGroupSourceId"
          @click="copiarSetGroup"
        >
          Copiar
        </q-btn>
        <q-btn
          v-else
          flat
          dense
          round
          icon="today"
          :disabled="!workout || (workout && !workout.id)"
          @click="copiarEntreno"
        >
          Copiar
        </q-btn>
      </q-toolbar>
      <q-toolbar>
        <q-toolbar-title> {{ date }} </q-toolbar-title>
        <q-space />
        <q-btn-group flat>
          <q-btn
            flat
            dense
            round
            :color="showCalendar ? 'positive' : ''"
            icon="date_range"
            @click="showCalendar = !showCalendar"
          />
        </q-btn-group>
      </q-toolbar>
    </div>

    <CalendarWorkouts
      ref="calendarRef"
      :showCalendar="showCalendar"
      :exerciseId="
        $route.query.exerciseId ? Number($route.query.exerciseId) : null
      "
      @updateDate="updateDate"
      @updateWorkout="updateWorkout"
    />

    <SetGroupsContainer
      :onlyRead="true"
      :workout="workout"
      :showSummary="true"
      :exerciseId="
        $route.query.exerciseId ? Number($route.query.exerciseId) : null
      "
    />
  </q-page>
</template>

<script>
import moment from "moment";
import { defineComponent, ref, reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import WorkoutService from "src/services/WorkoutService";
import SetGroupService from "src/services/SetGroupService";
import SetGroupsContainer from "src/components/tracker/SetGroupsContainer.vue";
import CalendarWorkouts from "src/components/tracker/CalendarWorkouts.vue";
export default defineComponent({
  name: "MuscleGroupPage",
  components: { SetGroupsContainer, CalendarWorkouts },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const showCalendar = ref(true);

    const today = moment().format("YYYY/MM/DD");
    const date = ref(today);

    const workout = reactive({ date: moment().format("YYYY/MM/DD") });

    const setGroupSourceId = ref(null);
    watchEffect(() => {
      if (
        route.query.exerciseId &&
        workout.setGroups &&
        workout.setGroups.length
      ) {
        const setGroupsDb = workout.setGroups.reverse();
        const setGroupDb = setGroupsDb.find(
          (element) => element.exercise.id == route.query.exerciseId
        );
        if (setGroupDb && setGroupDb.id) {
          setGroupSourceId.value = setGroupDb.id;
        }
      }
    });

    async function copiarSetGroup() {
      await SetGroupService.replaceSetGroupSetsWithSetGroup(
        route.query.setGroupId,
        setGroupSourceId.value
      );
      router.back();
    }

    async function copiarEntreno() {
      await WorkoutService.copySetGroupsFromWorkoutToWorkout(
        route.query.workoutId,
        workout.id
      );
      router.back();
    }

    function updateWorkout(workoutValue) {
      if (workoutValue && workoutValue.id) {
        for (const key of Object.keys(workoutValue))
          workout[key] = workoutValue[key];
        return;
      }
      workout.id = null;
      workout.description = null;
      workout.date = moment(date.value).format("YYYY/MM/DD");
    }
    function updateDate(dateCalendar) {
      date.value = dateCalendar;
    }

    return {
      showCalendar,
      date,
      workout,
      copiarEntreno,
      copiarSetGroup,
      setGroupSourceId,
      updateWorkout,
      updateDate,
    };
  },
});
</script>

<style scoped>
.maxAncho {
  width: 100% !important;
}
</style>
