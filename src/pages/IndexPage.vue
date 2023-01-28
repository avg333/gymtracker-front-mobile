<template>
  <q-drawer v-model="state.leftDrawerOpen" show-if-above bordered>
    <LeftDrawner />
  </q-drawer>

  <q-dialog v-model="state.modalWorkouts.visible">
    <ChangeFromWorkoutModal
      :workoutId="state.workoutId"
      :defaultDate="state.date"
      :setGroupId="state.modalWorkouts.setGroupId"
      :exerciseId="state.modalWorkouts.exerciseId"
      @closeModal="
        reloadWorkout();
        state.modalWorkouts.visible = false;
        state.modalWorkouts.setGroupId = null;
        state.modalWorkouts.exerciseId = null;
      "
    />
  </q-dialog>

  <q-dialog v-model="state.modalChangeDate">
    <ChangeWorkoutDateModal
      :workoutId="state.workoutId"
      :initialDate="state.date"
      @closeModal="
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
      :workoutId="state.workoutId"
      @showHideLeftDrawer="state.leftDrawerOpen = !state.leftDrawerOpen"
      @setToday="setToday"
      @showHideCalendar="state.showCalendar = !state.showCalendar"
      @showModalChangeDate="state.modalChangeDate = true"
      @showRemoveWorkoutModal="removeWorkout"
    />

    <CalendarWorkouts
      v-if="state.isLogged"
      ref="calendarRef"
      :updateDateQuery="true"
      :showCalendar="state.showCalendar"
      :defaultDate="$route.query.date"
      @updateDate="updateDate"
      @updateWorkoutId="updateWorkoutId"
    />

    <SetGroupsContainer
      v-if="state.isLogged"
      ref="setGroupsref"
      :workoutId="state.workoutId"
      :showSummary="true"
      @showHistoricoModalUp="showHistoricoModal"
    />

    <q-page-sticky
      v-if="state.isLogged"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <AddButton
        :workoutId="state.workoutId"
        @createWorkout="createWorkout"
        @showModalWorkouts="
          state.modalWorkouts.visible = true;
          state.modalWorkouts.setGroupId = null;
          state.modalWorkouts.exerciseId = null;
        "
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
//READY!
import { useQuasar } from "quasar";
import { defineComponent, ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useLoginStore } from "stores/login-store";
import LeftDrawner from "components/LeftDrawner.vue";
import ChangeWorkoutDateModal from "components/modals/ChangeWorkoutDateModal.vue";
import ChangeFromWorkoutModal from "components/modals/ChangeFromWorkoutModal.vue";
import TrackerToolbar from "components/tracker/TrackerToolbar.vue";
import CalendarWorkouts from "components/tracker/CalendarWorkouts.vue";
import SetGroupsContainer from "components/tracker/SetGroupsContainer.vue";
import AddButton from "components/tracker/AddButton.vue";
import WorkoutService from "src/services/WorkoutService";
import { dateToISO8601 } from "src/utils/dateFormater";
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
      workoutId: null,
      date: route.query.date ? route.query.date : dateToISO8601(),
      leftDrawerOpen: false,
      showCalendar: false,
      modalChangeDate: false,
      modalWorkouts: { visible: false, setGroupId: null, exerciseId: null },
    });

    async function createWorkout() {
      const newWorkout = { date: state.date };
      await WorkoutService.create(useStore.getUserId, newWorkout);
      reloadWorkoutDates();
    }

    const $q = useQuasar();
    async function removeWorkout() {
      $q.dialog({
        title: "¿Eliminar entrenamiento?",
        message: "Esta acción no se puede deshacer",
        cancel: true,
        ok: {
          push: true,
          label: "Eliminar",
          color: "negative",
        },
      }).onOk(async () => {
        await WorkoutService.delete(state.workoutId);
        reloadWorkoutDates();
      });
    }

    function showHistoricoModal(data) {
      state.modalWorkouts.setGroupId = data.setGroupId;
      state.modalWorkouts.exerciseId = data.exerciseId;
      state.modalWorkouts.visible = true;
    }

    const setGroupsref = ref(null);
    function reloadWorkout() {
      setGroupsref.value.getWorkout();
    }

    const calendarRef = ref(null);
    function reloadWorkoutDates() {
      calendarRef.value.getWorkoutsDates();
    }
    function setToday() {
      calendarRef.value.setToday();
    }

    function updateWorkoutId(idWorkout) {
      state.workoutId = idWorkout;
    }
    function updateDate(dateCalendar) {
      state.date = dateCalendar;
    }

    return {
      state,
      createWorkout,
      removeWorkout,
      showHistoricoModal,
      setGroupsref,
      reloadWorkout,
      calendarRef,
      updateWorkoutId,
      updateDate,
      setToday,
      reloadWorkoutDates,
    };
  },
});
</script>
