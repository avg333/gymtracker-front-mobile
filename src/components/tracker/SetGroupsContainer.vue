<template>
  <q-dialog v-model="state.modalSet.visible" v-if="!onlyRead">
    <SetModal
      :setId="state.modalSet.setId"
      :setGroupId="state.modalSet.setGroupId"
      :setsSize="state.modalSet.setsSize"
      :exerciseId="state.modalSet.exerciseId"
      @closeModal="
        getWorkout();
        state.modalSet.visible = false;
      "
    />
  </q-dialog>

  <div v-if="workoutId">
    <SummaryWo :workout="state.workout" v-if="showSummary" />

    <SetGroupCard
      v-for="setGroup in state.workout?.setGroups"
      class="bg-grey-1 items-center"
      :key="setGroup.id"
      :setGroup="setGroup"
      :onlyRead="onlyRead"
      :exerciseId="exerciseId"
      @showSetModal="showSetModal"
      @showHistoricoModal="showHistoricoModal"
      @updateSets="getWorkout()"
    />

    <div
      v-if="!state.workout?.setGroups?.length"
      class="flex flex-center text-center q-pa-md"
    >
      {{ $t("tracker.empty") }}
    </div>
  </div>

  <div v-else class="flex flex-center text-center q-pa-md">
    {{ $t("tracker.null") }}
  </div>
</template>

<script>
//READY!
import { reactive, onBeforeMount, watch } from "vue";
import SummaryWo from "components/tracker/SummaryWo.vue";
import SetModal from "components/modals/SetModal.vue";
import SetGroupCard from "components/cards/SetGroupCard.vue";
import WorkoutService from "src/services/WorkoutService";
export default {
  name: "SetGroupsContainer",
  emits: ["showHistoricoModalUp"],
  components: { SetModal, SummaryWo, SetGroupCard },
  props: {
    workoutId: Number,
    onlyRead: Boolean,
    showSummary: Boolean,
    exerciseId: Number, //Remarca los setGroups con este ejercicio
  },
  setup(props, { expose, emit }) {
    const state = reactive({
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
        state.workout = {};
      }
    }

    function showSetModal(data) {
      state.modalSet.setId = data.setId;
      state.modalSet.setGroupId = data.setGroupId;
      state.modalSet.setsSize = data.setsSize;
      state.modalSet.exerciseId = data.exerciseId;
      state.modalSet.visible = true;
    }

    function showHistoricoModal(data) {
      emit("showHistoricoModalUp", data);
    }

    expose({
      getWorkout,
    });

    return { state, getWorkout, showSetModal, showHistoricoModal };
  },
};
</script>
