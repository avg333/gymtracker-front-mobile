<template>
  <q-drawer v-model="state.leftDrawerOpen" show-if-above bordered>
    <LeftDrawner />
  </q-drawer>

  <q-dialog v-model="state.modalChangeDate">
    <ChangeWorkoutDateModal
      :workoutId="state.workout?.id"
      :initialDate="state.date"
      @closeModal="
        reloadWorkout();
        reloadWorkoutDates();
        state.modalChangeDate = false;
      "
    />
  </q-dialog>

  <q-page class="bg-grey-4">
    <TrackerToolbar
      :date="state.date"
      :isLogged="state.isLogged"
      :calendarActive="state.showCalendar"
      :workoutId="state.workout.id"
      @showHideLeftDrawer="state.leftDrawerOpen = !state.leftDrawerOpen"
      @setToday="setDate(dateToBars())"
      @showHideCalendar="state.showCalendar = !state.showCalendar"
      @showModalChangeDate="state.modalChangeDate = true"
      @showRemoveWorkoutModal="removeWorkout"
    />

    <CalendarWorkouts
      v-if="state.isLogged"
      ref="calendarRef"
      :showCalendar="state.showCalendar"
      @updateDate="updateDate"
      @updateWorkout="updateWorkout"
    />

    <SetGroupsContainer
      v-if="state.isLogged"
      :workout="state.workout"
      :showSummary="true"
    />

    <q-page-sticky
      v-if="state.isLogged"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <AddButton
        :workoutId="state.workout?.id"
        :date="state.date"
        @createWorkout="createWorkout"
      />
    </q-page-sticky>

    <div v-else class="flex flex-center text-center q-pa-md">
      <div>
        <span> {{ $t("tracker.notLogged") }} </span>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useLoginStore } from "stores/login-store";
import LeftDrawner from "components/LeftDrawner.vue";
import TrackerToolbar from "components/tracker/TrackerToolbar.vue";
import ChangeWorkoutDateModal from "components/modals/ChangeWorkoutDateModal.vue";
import CalendarWorkouts from "components/tracker/CalendarWorkouts.vue";
import SetGroupsContainer from "components/tracker/SetGroupsContainer.vue";
import AddButton from "components/tracker/addButton.vue";
import WorkoutService from "src/services/WorkoutService";
import { dateToISO8601, dateToBars } from "../utils/dateFormater";
export default defineComponent({
  name: "IndexPage",
  components: {
    LeftDrawner,
    ChangeWorkoutDateModal,
    AddButton,
    SetGroupsContainer,
    CalendarWorkouts,
    TrackerToolbar,
  },
  setup() {
    const route = useRoute();
    const useStore = useLoginStore();

    const state = reactive({
      workout: {},
      date: route.query.date ? route.query.date : dateToBars(),
      leftDrawerOpen: false,
      showCalendar: false,
      modalChangeDate: false,
      isLogged: computed(() => useStore.getIsLogged),
    });

    async function createWorkout() {
      const newWorkout = { date: dateToISO8601(state.date) };
      await WorkoutService.create(useStore.getUserId, newWorkout);
      reloadWorkoutDates();
      reloadWorkout();
    }

    const $q = useQuasar();
    async function removeWorkout() {
      $q.dialog({
        title: "¿Delete Workout?",
        message: "This action can not be undone",
        cancel: true,
        ok: {
          push: true,
          label: "Delete",
          color: "negative",
        },
      }).onOk(async () => {
        if (state.workout?.id) {
          await WorkoutService.delete(state.workout.id);
          reloadWorkout();
          reloadWorkoutDates();
        }
      });
    }

    const calendarRef = ref(null);
    function reloadWorkoutDates() {
      calendarRef.value.getWorkoutsDates();
    }
    function reloadWorkout() {
      calendarRef.value.getDateWorkout(state.date, true);
    }
    function setDate(dateValue) {
      calendarRef.value.setDate(dateValue);
    }
    function updateWorkout(workoutValue) {
      state.workout = workoutValue;
    }
    function updateDate(dateCalendar) {
      state.date = dateCalendar;
    }

    return {
      dateToBars,
      state,
      createWorkout,
      removeWorkout,
      calendarRef,
      updateWorkout,
      updateDate,
      setDate,
      reloadWorkoutDates,
      reloadWorkout,
    };
  },
});
</script>
