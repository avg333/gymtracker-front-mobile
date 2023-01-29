<template>
  <q-toolbar>
    <q-tabs class="maxAncho">
      <q-chip
        color="orange"
        square
        clickable
        icon="star"
        :outline="!filter.selectedFav"
        @click="filter.selectedFav = !filter.selectedFav"
      />
      <q-chip
        color="purple"
        square
        clickable
        :outline="!filter.selectedUnilateral"
        @click="filter.selectedUnilateral = !filter.selectedUnilateral"
      >
        {{ $t("muscleGroupPages.filter.unilateral") }}
      </q-chip>
      <q-chip
        v-for="loadType in state.loadTypes"
        :key="loadType"
        color="primary"
        square
        clickable
        :outline="filter.selectedLoadType !== loadType"
        @click="
          filter.selectedLoadType =
            filter.selectedLoadType === loadType ? null : loadType
        "
      >
        {{ $t("loadType." + loadType.toLowerCase()) }}
      </q-chip>
    </q-tabs>
  </q-toolbar>
  <q-toolbar>
    <q-tabs class="maxAncho">
      <q-chip
        v-if="filter.selectedMuscleSupGroupId"
        color="secondary"
        square
        clickable
        removable
        @remove="
          filter.selectedMuscleSupGroupId = null;
          filter.selectedMuscleGroupId = null;
          filter.selectedMuscleSubGroups = [];
        "
      >
        {{
          $t(
            "muscleSupGroup." +
              state.muscleSupGroups.find(
                (msg) => msg.id === filter.selectedMuscleSupGroupId
              )?.id
          )
        }}
      </q-chip>
      <q-chip
        v-else
        v-for="muscleSupGroup in state.muscleSupGroups"
        :key="muscleSupGroup.id"
        color="secondary"
        square
        clickable
        :outline="muscleSupGroup.id !== filter.selectedMuscleSupGroupId"
        @click="filter.selectedMuscleSupGroupId = muscleSupGroup.id"
      >
        {{ $t("muscleSupGroup." + muscleSupGroup.id) }}
      </q-chip>

      <q-chip
        v-if="filter.selectedMuscleGroupId"
        color="warning"
        square
        clickable
        removable
        @remove="
          filter.selectedMuscleGroupId = null;
          filter.selectedMuscleSubGroups = [];
        "
      >
        {{
          $t(
            "muscleGroup." +
              state.muscleGroups.find(
                (msg) => msg.id === filter.selectedMuscleGroupId
              )?.id
          )
        }}
      </q-chip>
      <q-chip
        v-else
        v-for="muscleGroup in state.muscleGroups"
        :key="muscleGroup.id"
        color="warning"
        square
        clickable
        :outline="muscleGroup.id !== filter.selectedMuscleGroupId"
        @click="filter.selectedMuscleGroupId = muscleGroup.id"
      >
        {{ $t("muscleGroup." + muscleGroup.id) }}
      </q-chip>

      <q-chip
        v-for="muscleSubGroup in state.muscleSubGroups"
        :key="muscleSubGroup.id"
        color="red"
        square
        clickable
        :outline="!filter.selectedMuscleSubGroups.includes(muscleSubGroup.id)"
        @click="
          filter.selectedMuscleSubGroups.includes(muscleSubGroup.id)
            ? filter.selectedMuscleSubGroups.splice(
                filter.selectedMuscleSubGroups.indexOf(muscleSubGroup.id),
                1
              )
            : filter.selectedMuscleSubGroups.push(muscleSubGroup.id)
        "
      >
        {{ $t("muscleSubGroup." + muscleSubGroup.id) }}
      </q-chip>
    </q-tabs>
  </q-toolbar>
</template>

<script>
//READY!
import { ref, reactive, watch, onBeforeMount } from "vue";
import EnumService from "src/services/EnumService";
import MuscleGroupService from "src/services/MuscleGroupService";
export default {
  name: "ExerciseFilterBar",
  emits: ["setFilter"],
  setup(_, { emit, expose }) {
    const state = reactive({
      loadTypes: [],
      muscleSupGroups: [],
      muscleGroups: [],
      muscleSubGroups: [],
    });

    const filter = ref({
      selectedFav: false,
      selectedUnilateral: null,
      selectedLoadType: null,
      selectedMuscleSupGroupId: null,
      selectedMuscleGroupId: null,
      selectedMuscleSubGroups: [],
    });

    onBeforeMount(() => {
      EnumService.getAll().then((res) => {
        state.loadTypes = res;
      });
      MuscleGroupService.getAllMuscleSupGroups().then((res) => {
        state.muscleSupGroups = res;
      });
      emit("setFilter", filter.value);
    });

    watch(
      () => filter.value.selectedMuscleSupGroupId,
      () => {
        if (filter.value.selectedMuscleSupGroupId) {
          MuscleGroupService.getAllMuscleSupGroupMuscleGroups(
            filter.value.selectedMuscleSupGroupId
          ).then((res) => {
            state.muscleGroups = res;
          });
        } else {
          state.muscleGroups = [];
        }
      }
    );

    watch(
      () => filter.value.selectedMuscleGroupId,
      () => {
        if (filter.value.selectedMuscleGroupId) {
          MuscleGroupService.getAllMuscleGroupMuscleSubGroups(
            filter.value.selectedMuscleGroupId
          ).then((res) => {
            state.muscleSubGroups = res;
          });
        } else {
          state.muscleSubGroups = [];
        }
      }
    );

    watch(filter.value, () => {
      emit("setFilter", filter.value);
    });

    function preSetFilter(
      selectedMuscleSupGroupId,
      selectedMuscleGroupId,
      selectedMuscleSubGroups
    ) {
      filter.value.selectedMuscleSupGroupId = selectedMuscleSupGroupId;
      filter.value.selectedMuscleGroupId = selectedMuscleGroupId;
      filter.value.selectedMuscleSubGroups = selectedMuscleSubGroups;
    }

    expose({
      preSetFilter,
    });

    return { state, filter };
  },
};
</script>

<style scoped>
.maxAncho {
  width: 100% !important;
}
</style>
