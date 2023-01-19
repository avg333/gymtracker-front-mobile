<template>
  <q-dialog v-model="setModalData.visible" v-if="!onlyRead">
    <SetModal
      :setId="setModalData.setId"
      :setGroupId="setModalData.setGroupId"
      :setsSize="setModalData.setsSize"
      :exerciseId="setModalData.exerciseId"
      @closeModal="
        getSets();
        setModalData.visible = false;
      "
    />
  </q-dialog>

  <div v-if="workout && workout.id">
    <SummaryWo :workout="workout" v-if="showSummary" />
    <SummaryMuscleGroups :workout="workout" v-if="showSummary" />

    <div class="row items-center" v-if="setGroups.length">
      <div class="col-12">
        <SetGroupCard
          class="bg-grey-1"
          v-for="setGroup in setGroups"
          :key="setGroup.id"
          :setGroup="setGroup"
          :onlyRead="onlyRead"
          :exerciseId="exerciseId"
          @showSetModal="showSetModal"
          @closeModal="getSets"
        />
      </div>
    </div>

    <div v-else class="flex flex-center text-center q-pa-md">
      <div>
        <span> Entrenamiento vacio </span>
      </div>
    </div>
  </div>

  <div v-else class="flex flex-center text-center q-pa-md">
    <div>
      <span> {{ $t("tracker.empty") }} </span>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount, watchEffect } from "vue";
import SetGroupCard from "../cards/SetGroupCard.vue";
import SetModal from "../modals/SetModal.vue";
import SummaryMuscleGroups from "./summaryMuscleGroups.vue";
import SummaryWo from "./summaryWo.vue";
import SetGroupService from "src/services/SetGroupService";
export default {
  props: {
    workout: Object,
    onlyRead: Boolean,
    showSummary: Boolean,
    exerciseId: Number,
  },
  components: { SetModal, SummaryWo, SummaryMuscleGroups, SetGroupCard },
  setup(props) {
    const setGroups = ref([]);
    function getSets() {
      if (props.workout && props.workout.id) {
        SetGroupService.getAllWorkoutSetGroups(props.workout.id).then((res) => {
          setGroups.value = res;
        });
      } else {
        setGroups.value = [];
      }
    }

    onBeforeMount(() => {
      getSets();
    });

    watchEffect(() => {
      props.workout;
      getSets();
    });

    const setModalData = reactive({
      setId: null,
      setGroupId: null,
      setsSize: null,
      exerciseId: null,
      visible: false,
    });
    function showSetModal(data) {
      setModalData.setId = data.setId;
      setModalData.setGroupId = data.setGroupId;
      setModalData.setsSize = data.setsSize;
      setModalData.exerciseId = data.exerciseId;
      setModalData.visible = true;
    }

    return {
      setGroups,
      getSets,
      showSetModal,
      setModalData,
    };
  },
};
</script>
