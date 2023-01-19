<template>
  <q-dialog v-model="state.modalSet.visible" v-if="!onlyRead">
    <SetModal
      :setId="state.modalSet.setId"
      :setGroupId="state.modalSet.setGroupId"
      :setsSize="state.modalSet.setsSize"
      :exerciseId="state.modalSet.exerciseId"
      @closeModal="
        getSets();
        $emit('reloadWorkout');
        state.modalSet.visible = false;
      "
    />
  </q-dialog>

  <div v-if="workout?.id">
    <SummaryWo :workout="workout" v-if="showSummary" />
    <SummaryMuscleGroups :workout="workout" v-if="showSummary" />

    <SetGroupCard
      v-for="setGroup in state.setGroups"
      class="bg-grey-1 items-center"
      :key="setGroup.id"
      :setGroup="setGroup"
      :onlyRead="onlyRead"
      :exerciseId="exerciseId"
      @showSetModal="showSetModal"
      @closeModal="getSets()"
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
import { reactive, onBeforeMount, watchEffect } from "vue";
import SummaryMuscleGroups from "components/tracker/summaryMuscleGroups.vue";
import SummaryWo from "components/tracker/summaryWo.vue";
import SetModal from "components/modals/SetModal.vue";
import SetGroupCard from "components/cards/SetGroupCard.vue";
import SetGroupService from "src/services/SetGroupService";
export default {
  props: {
    workout: Object, //TODO Cambiar a workoutID?
    onlyRead: Boolean,
    showSummary: Boolean,
    exerciseId: Number, //Remarca los setGroups con este ejercicio
  },
  emits: ["reloadWorkout"],
  components: { SetModal, SummaryWo, SummaryMuscleGroups, SetGroupCard },
  setup(props) {
    const state = reactive({
      setGroups: [],
      modalSet: {
        visible: false,
        setId: null,
        setGroupId: null,
        setsSize: null,
        exerciseId: null,
      },
    });

    onBeforeMount(() => {
      getSets();
    });

    watchEffect(() => {
      props.workout; // TODO Hacer esto mas elegante
      getSets();
    });

    function getSets() {
      if (props.workout?.id) {
        SetGroupService.getAllWorkoutSetGroups(props.workout.id).then((res) => {
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

    return { state, getSets, showSetModal };
  },
};
</script>
