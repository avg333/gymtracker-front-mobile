<template>
  <q-drawer v-model="state.leftDrawerOpen" show-if-above bordered>
    <LeftDrawner />
  </q-drawer>

  <q-dialog v-model="state.modalWorkouts.visible" v-if="state.workoutId">
    <ChangeFromWorkoutModal :workoutId="state.workoutId" :defaultDate="state.date"
      :setGroupId="state.modalWorkouts.setGroupId" :exerciseId="state.modalWorkouts.exerciseId" @closeModal="
        reloadWorkout();
      state.modalWorkouts.visible = false;
      state.modalWorkouts.setGroupId = null;
      state.modalWorkouts.exerciseId = null;
      " />
  </q-dialog>

  <q-dialog v-model="state.modalChangeDate" v-if="state.workoutId">
    <ChangeWorkoutDateModal :workoutId="state.workoutId" :initialDate="state.date" @closeModal="
      reloadWorkoutDates();
    state.modalChangeDate = false;
    " />
  </q-dialog>

  <q-page class="bg-grey-4">
    <TrackerToolbar :date="state.date" :isLogged="state.isLogged" :calendarActive="state.showCalendar"
      :workoutId="state.workoutId" @showHideLeftDrawer="state.leftDrawerOpen = !state.leftDrawerOpen" @setToday="setToday"
      @showHideCalendar="state.showCalendar = !state.showCalendar" @showModalChangeDate="state.modalChangeDate = true"
      @showRemoveWorkoutModal="removeWorkout" />

    <CalendarWorkouts v-if="state.isLogged" ref="calendarRef" :updateDateQuery="true" :showCalendar="state.showCalendar"
      :defaultDate="state.date" @updateDate="updateDate" @updateWorkoutId="updateWorkoutId" />

    <SetGroupsContainer v-if="state.isLogged" ref="setGroupsref" :workoutId="state.workoutId" :showSummary="true"
      @showHistoricoModalUp="showHistoricoModal" />

    <q-page-sticky v-if="state.isLogged" position="bottom-right" :offset="[18, 18]">
      <AddButton :workoutId="state.workoutId" @createWorkout="createWorkout" @showModalWorkouts="
        state.modalWorkouts.visible = true;
      state.modalWorkouts.setGroupId = null;
      state.modalWorkouts.exerciseId = null;
      " />
    </q-page-sticky>

    <div v-else class="flex flex-center text-center q-pa-md">
      <div>
        <span> {{ $t("tracker.notLogged") }} </span>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//READY!
import { useQuasar } from 'quasar';
import { ref, reactive, computed } from 'vue';
import type { Ref } from 'vue'
import { useRoute } from 'vue-router';
import { useLoginStore } from 'stores/login-store';
import LeftDrawner from 'components/LeftDrawner.vue';
import ChangeWorkoutDateModal from 'components/modals/ChangeWorkoutDateModal.vue';
import ChangeFromWorkoutModal from 'components/modals/ChangeFromWorkoutModal.vue';
import TrackerToolbar from 'components/tracker/TrackerToolbar.vue';
import CalendarWorkouts from 'components/tracker/CalendarWorkouts.vue';
import SetGroupsContainer from 'components/tracker/SetGroupsContainer.vue';
import AddButton from 'components/tracker/AddButton.vue';
import WorkoutService from 'src/services/workouts-api/WorkoutService';
import { dateToISO8601 } from 'src/utils/dateFormater';

const route = useRoute();
const useStore = useLoginStore();

const state: State = reactive({
  isLogged: computed(() => useStore.getIsLogged),
  workoutId: null,
  date: getStartDate(),
  leftDrawerOpen: false,
  showCalendar: false,
  modalChangeDate: false,
  modalWorkouts: { visible: false, setGroupId: null, exerciseId: null },
});

function getStartDate() {
  const startDate: string = route.query.date as string
  const dateOk = startDate ? startDate : dateToISO8601(null)
  return dateOk
}

interface State {
  isLogged: boolean,
  workoutId: string | null,
  date: string,
  leftDrawerOpen: boolean,
  showCalendar: boolean,
  modalChangeDate: boolean,
  modalWorkouts: ModalWorkouts,
};

interface ModalWorkouts {
  visible: boolean,
  setGroupId: string | null,
  exerciseId: string | null,
}

async function createWorkout() {
  const tempDate: string = state.date
  const newWorkout = { date: tempDate, description: null };
  await WorkoutService.create(useStore.getUserId, newWorkout);
  reloadWorkoutDates();
}

const $q = useQuasar();
async function removeWorkout() {
  $q.dialog({
    title: '¿Eliminar entrenamiento?',
    message: 'Esta acción no se puede deshacer',
    cancel: true,
    ok: {
      push: true,
      label: 'Eliminar',
      color: 'negative',
    },
  }).onOk(async () => {
    if (!state.workoutId) {
      return
    }

    await WorkoutService.delete(state.workoutId);
    reloadWorkoutDates();
  });
}

export interface ShowHistoricoModal {
  setGroupId: string,
  exerciseId: string,
}

function showHistoricoModal(data: ShowHistoricoModal) {
  state.modalWorkouts.setGroupId = data.setGroupId;
  state.modalWorkouts.exerciseId = data.exerciseId;
  state.modalWorkouts.visible = true;
}

const setGroupsref = ref<InstanceType<typeof SetGroupsContainer>>();
function reloadWorkout() {
  setGroupsref.value?.getWorkout();
}

const calendarRef: Ref<InstanceType<typeof CalendarWorkouts> | null> = ref<InstanceType<typeof CalendarWorkouts> | null>(null);
function reloadWorkoutDates() {
  calendarRef.value?.getWorkoutsDates();
}
function setToday() {
  calendarRef.value?.setToday();
}

function updateWorkoutId(idWorkout: string) {
  state.workoutId = idWorkout;
}
function updateDate(dateCalendar: string) {
  state.date = dateCalendar;
}

</script>
