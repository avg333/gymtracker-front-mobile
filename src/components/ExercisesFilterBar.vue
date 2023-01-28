<template>
  <q-toolbar>
    <q-tabs class="maxAncho">
      <q-chip
        color="orange"
        square
        clickable
        icon="star"
        :outline="!selectedFav"
        @click="$emit('changeSelectedFav')"
      />
      <q-chip
        color="purple"
        square
        clickable
        :outline="!selectedUnilateral"
        @click="$emit('changeSelectedUnilateral')"
      >
        {{ $t("muscleGroupPages.filter.unilateral") }}
      </q-chip>
      <q-chip
        v-for="loadType in state.loadTypes"
        :key="loadType"
        color="primary"
        square
        clickable
        :outline="selectedLoadType !== loadType"
        @click="
          $emit(
            'setSelectedLoadType',
            selectedLoadType === loadType ? null : loadType
          )
        "
      >
        {{ loadType }}
      </q-chip>
    </q-tabs>
  </q-toolbar>
  <q-toolbar>
    <q-tabs class="maxAncho">
      <q-chip
        v-if="selectedMuscleSupGroupId"
        color="secondary"
        square
        clickable
        removable
        @remove="$emit('setSelectedMuscleSupGroup')"
      >
        {{
          state.muscleSupGroups.find(
            (msg) => msg.id === selectedMuscleSupGroupId
          )?.name
        }}
      </q-chip>
      <q-chip
        v-else
        v-for="muscleSupGroup in state.muscleSupGroups"
        :key="muscleSupGroup.id"
        color="primary"
        square
        clickable
        :outline="muscleSupGroup.id !== selectedMuscleSupGroupId"
        @click="$emit('setSelectedMuscleSupGroup', muscleSupGroup.id)"
      >
        {{ muscleSupGroup.name }}
      </q-chip>

      <q-chip
        v-if="selectedMuscleGroupId"
        color="warning"
        square
        clickable
        removable
        @remove="$emit('setSelectedMuscleGroup')"
      >
        {{
          state.muscleGroups.find((msg) => msg.id === selectedMuscleGroupId)
            ?.name
        }}
      </q-chip>
      <q-chip
        v-else
        v-for="muscleGroup in state.muscleGroups"
        :key="muscleGroup.id"
        color="warning"
        square
        clickable
        :outline="muscleGroup.id !== selectedMuscleGroupId"
        @click="$emit('setSelectedMuscleGroup', muscleGroup.id)"
      >
        {{ muscleGroup.name }}
      </q-chip>

      <q-chip
        v-for="muscleSubGroup in state.muscleSubGroups"
        :key="muscleSubGroup.id"
        color="red"
        square
        clickable
        :outline="!selectedMuscleSubGroups.includes(muscleSubGroup.id)"
        @click="setSelectedMuscleSubGroups(muscleSubGroup.id)"
      >
        {{ muscleSubGroup.name }}
      </q-chip>
    </q-tabs>
  </q-toolbar>
</template>

<script>
import { reactive, watch, onBeforeMount } from "vue";
import EnumService from "src/services/EnumService";
import MuscleGroupService from "src/services/MuscleGroupService";
export default {
  name: "ExerciseFilterBar",
  emits: [
    "changeSelectedFav",
    "changeSelectedUnilateral",
    "setSelectedLoadType",
    "setSelectedMuscleSubGroups",
    "setSelectedMuscleSupGroup",
    "setSelectedMuscleGroup",
  ],
  props: {
    selectedFav: Boolean,
    selectedUnilateral: Boolean,
    selectedLoadType: String,
    selectedMuscleSupGroupId: Number,
    selectedMuscleGroupId: Number,
    selectedMuscleSubGroups: Array,
  },
  setup(props, { emit }) {
    const state = reactive({
      loadTypes: [],
      muscleSupGroups: [],
      muscleGroups: [],
      muscleSubGroups: [],
    });

    onBeforeMount(async () => {
      EnumService.getAll().then((res) => {
        state.loadTypes = res;
      });
      MuscleGroupService.getAllMuscleSupGroups().then((res) => {
        state.muscleSupGroups = res;
      });
    });

    watch(
      () => props.selectedMuscleSupGroupId,
      () => {
        if (props.selectedMuscleSupGroupId) {
          MuscleGroupService.getAllMuscleSupGroupMuscleGroups(
            props.selectedMuscleSupGroupId
          ).then((res) => {
            state.muscleGroups = res;
          });
        } else {
          state.muscleGroups = [];
        }
      }
    );

    watch(
      () => props.selectedMuscleGroupId,
      () => {
        if (props.selectedMuscleGroupId) {
          MuscleGroupService.getAllMuscleGroupMuscleSubGroups(
            props.selectedMuscleGroupId
          ).then((res) => {
            state.muscleSubGroups = res;
          });
        } else {
          state.muscleSubGroups = [];
        }
      }
    );

    function setSelectedMuscleSubGroups(muscleSubGroupId) {
      const selectedMuscleSubGroups = props.selectedMuscleSubGroups
        ? props.selectedMuscleSubGroups
        : [];

      selectedMuscleSubGroups.includes(muscleSubGroupId)
        ? selectedMuscleSubGroups.splice(
            selectedMuscleSubGroups.indexOf(muscleSubGroupId),
            1
          )
        : selectedMuscleSubGroups.push(muscleSubGroupId);
      emit("setSelectedMuscleSubGroups", selectedMuscleSubGroups);
    }

    return { state, setSelectedMuscleSubGroups };
  },
};
</script>

<style scoped>
.maxAncho {
  width: 100% !important;
}
</style>
