<template>
  <q-dialog v-model="state.modalSet.visible" v-if="!onlyRead">
    <SetModal
      :setId="state.modalSet.setId"
      :setGroupId="state.modalSet.setGroupId"
      :setsSize="state.modalSet.setsSize"
      :exerciseId="state.modalSet.exerciseId"
      @closeModal="
        getSets();
        getWorkout();
        state.modalSet.visible = false;
      "
    />
  </q-dialog>

  <div v-if="workoutId">
    <TheSummaryWo :workout="state.workout" v-if="showSummary" />

    <SetGroupCard
      v-for="setGroup in state.setGroups"
      class="bg-grey-1 items-center"
      :key="setGroup.id"
      :setGroup="setGroup"
      :onlyRead="onlyRead"
      :exerciseId="exerciseId"
      @showSetModal="showSetModal"
      @closeModal="
        getSets();
        getWorkout();
      "
    />

    <div
      v-if="!state.setGroups.length"
      class="flex flex-center text-center q-pa-md"
    >
      Entrenamiento vacio
    </div>
  </div>

  <div v-else class="flex flex-center text-center q-pa-md">
    {{ $t("tracker.empty") }}
  </div>
</template>

<script>
//READY
import { reactive, onBeforeMount, watch } from "vue";
import TheSummaryWo from "components/tracker/TheSummaryWo.vue";
import SetModal from "components/modals/SetModal.vue";
import SetGroupCard from "components/cards/SetGroupCard.vue";
import WorkoutService from "src/services/WorkoutService";
import SetGroupService from "src/services/SetGroupService";
export default {
  props: {
    workoutId: Number,
    onlyRead: Boolean,
    showSummary: Boolean,
    exerciseId: Number, //Remarca los setGroups con este ejercicio
  },
  emits: ["reloadWorkout"],
  components: { SetModal, TheSummaryWo, SetGroupCard },
  setup(props) {
    const state = reactive({
      setGroups: [],
      workout: {},
      modalSet: {
        visible: false,
        setId: null,
        setGroupId: null,
        setsSize: null,
        exerciseId: null,
      },
    });

    onBeforeMount(() => {
      getWorkout();
      getSets();
    });

    watch(
      () => props.workoutId,
      () => {
        getSets();
        getWorkout();
      }
    );

    function getWorkout() {
      if (props.workoutId) {
        WorkoutService.getById(props.workoutId).then((res) => {
          state.workout = res;
        });
      } else {
        state.workout = {};
      }
    }

    function getSets() {
      if (props.workoutId) {
        SetGroupService.getAllWorkoutSetGroups(props.workoutId).then((res) => {
          state.setGroups = res;
        });
      } else {
        state.setGroups = [];
      }
    }

    function showSetModal(data) {
      state.modalSet.setId = data.setId;
      state.modalSet.setGroupId = data.setGroupId;
      state.modalSet.setsSize = data.setsSize;
      state.modalSet.exerciseId = data.exerciseId;
      state.modalSet.visible = true;
    }

    return { state, getWorkout, getSets, showSetModal };
  },
};
</script>
