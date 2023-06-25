<template>
  <q-dialog v-model="state.modalSet.visible"
    v-if="!onlyRead && state.modalSet.exerciseId && state.modalSet.setsSize != null && state.modalSet.setGroupId">
    <SetModal :setId="state.modalSet.setId ?? ''" :setGroupId="state.modalSet.setGroupId"
      :setsSize="state.modalSet.setsSize" :exerciseId="state.modalSet.exerciseId" @closeModal="
        getWorkout();
      state.modalSet.visible = false;
      " />
  </q-dialog>

  <div v-if="state.workout">
    <SummaryWo :workout="state.workout" v-if="showSummary" />

    <SetGroupCard v-for="setGroup in state.workout?.setGroups" class="bg-grey-1 items-center" :key="setGroup.id"
      :setGroup="setGroup" :onlyRead="onlyRead" :exerciseId="exerciseId" @showSetModal="showSetModal"
      @showHistoricoModal="showHistoricoModal" @updateSets="getWorkout()" />

    <div v-if="!state.workout?.setGroups?.length" class="flex flex-center text-center q-pa-md">
      {{ $t("tracker.empty") }}
    </div>
  </div>

  <div v-else class="flex flex-center text-center q-pa-md">
    {{ $t("tracker.null") }}
  </div>
</template>

<script setup lang="ts">
//READY!
import { reactive, onBeforeMount, watch } from 'vue';
import SummaryWo from 'components/tracker/SummaryWo.vue';
import SetModal from 'components/modals/SetModal.vue';
import SetGroupCard from 'components/cards/SetGroupCard.vue';
import WorkoutService from 'src/services/workouts-api/WorkoutService';
import { GetWorkoutResponse } from 'src/types/workouts-api/WorkoutServiceTypes';
import { ShowHistoricoModal } from 'src/pages/IndexPage.vue'

const props = defineProps({
  workoutId: { type: String, required: false },
  onlyRead: { type: Boolean, required: false },
  showSummary: { type: Boolean, required: false },
  exerciseId: { type: String, required: false }
});
const emit = defineEmits<{
  showHistoricoModalUp: [data: ShowHistoricoModal]
}>()

const state: State = reactive({
  workout: null,
  modalSet: {
    visible: false,
    setId: null,
    setGroupId: null,
    setsSize: null,
    exerciseId: null,
  },
});
interface State {
  workout: GetWorkoutResponse | null,
  modalSet: ModalSet,
}
interface ModalSet {
  visible: boolean,
  setId: string | null,
  setGroupId: string | null,
  setsSize: number | null,
  exerciseId: string | null,
}

onBeforeMount(() => {
  getWorkout();
});

watch(
  () => props.workoutId,
  () => {
    getWorkout();
  }
);

function getWorkout() {
  if (props.workoutId) {
    WorkoutService.getById(props.workoutId).then((res) => {
      state.workout = res;
    });
  } else {
    state.workout = null;
  }
}


export interface ShowSetModal {
  setId: string | null,
  setGroupId: string,
  setsSize: number,
  exerciseId: string,
}
function showSetModal(data: ShowSetModal) {
  state.modalSet.setId = data.setId;
  state.modalSet.setGroupId = data.setGroupId;
  state.modalSet.setsSize = data.setsSize;
  state.modalSet.exerciseId = data.exerciseId;
  state.modalSet.visible = true;
}

function showHistoricoModal(data: ShowHistoricoModal) {
  emit('showHistoricoModalUp', data);
}

defineExpose({ getWorkout })
</script>
