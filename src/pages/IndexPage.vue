<template>
  <q-drawer v-model="state.leftDrawerOpen" show-if-above bordered>
    <LeftDrawner />
  </q-drawer>

  <q-dialog v-model="state.modalWorkouts.visible">
    <ChangeFromWorkoutModal :workoutId="state.modalWorkouts.idWorkout" />
  </q-dialog>

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
      @setToday="setToday"
      @showHideCalendar="state.showCalendar = !state.showCalendar"
      @showModalChangeDate="state.modalChangeDate = true"
      @showRemoveWorkoutModal="removeWorkout"
    />

    <CalendarWorkouts
      v-if="state.isLogged"
      ref="calendarRef"
      :showCalendar="state.showCalendar"
      :defaultDate="$route.query.date"
      @updateDate="updateDate"
      @updateWorkout="updateWorkout"
    />

    <SetGroupsContainer
      v-if="state.isLogged"
      :workoutId="state.workout?.id"
      :showSummary="true"
      @reloadWorkout="reloadWorkout()"
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
        @showModalWorkouts="showModalWorkouts"
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
import ChangeFromWorkoutModal from "components/modals/ChangeFromWorkoutModal.vue";
import CalendarWorkouts from "components/tracker/CalendarWorkouts.vue";
import SetGroupsContainer from "components/tracker/SetGroupsContainer.vue";
import AddButton from "components/tracker/AddButton.vue";
import WorkoutService from "src/services/WorkoutService";
import { dateToISO8601 } from "../utils/dateFormater";
export default defineComponent({
  name: "IndexPage",
  components: {
    LeftDrawner,
    ChangeWorkoutDateModal,
    AddButton,
    SetGroupsContainer,
    CalendarWorkouts,
    TrackerToolbar,
    ChangeFromWorkoutModal,
  },
  setup() {
    const route = useRoute();
    const useStore = useLoginStore();

    const state = reactive({
      isLogged: computed(() => useStore.getIsLogged),
      workout: {},
      date: route.query.date ? route.query.date : dateToISO8601(), //TODO Quizas no inicializar esto?
      leftDrawerOpen: false,
      showCalendar: false,
      modalChangeDate: false,
      modalWorkouts: { visible: false, idWorkout: null },
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

    function showModalWorkouts(idWorkout) {
      state.modalWorkouts.idWorkout = idWorkout;
      state.modalWorkouts.visible = true;
    }

    const calendarRef = ref(null);
    function reloadWorkoutDates() {
      calendarRef.value.getWorkoutsDates();
    }
    function reloadWorkout() {
      calendarRef.value.getDateWorkout(true);
    }
    function setToday() {
      calendarRef.value.setDate(dateToISO8601());
    }
    function updateWorkout(workoutValue) {
      state.workout = workoutValue;
    }
    function updateDate(dateCalendar) {
      state.date = dateCalendar;
    }

    return {
      state,
      createWorkout,
      removeWorkout,
      showModalWorkouts,
      calendarRef,
      updateWorkout,
      updateDate,
      setToday,
      reloadWorkoutDates,
      reloadWorkout,
    };
  },
});
</script>
