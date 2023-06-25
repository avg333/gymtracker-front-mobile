<template>
  <q-toolbar>
    <q-tabs class="maxAncho">
      <q-chip color="orange" square clickable icon="star" />
      <q-chip color="purple" square clickable :outline="!filter.unilateral"
        @click="filter.unilateral = !filter.unilateral">
        {{ $t("muscleGroupPages.filter.unilateral") }}
      </q-chip>
      <q-chip v-for="loadType in state.loadTypes" :key="loadType.id" color="primary" square clickable
        :outline="filter.loadType !== loadType.id" @click="
          filter.loadType =
          filter.loadType === loadType.id ? null : loadType.id
          ">
        {{ loadType.name }}
      </q-chip>
    </q-tabs>
  </q-toolbar>
  <q-toolbar>
    <q-tabs class="maxAncho">
      <q-chip v-if="filter.muscleSupGroupIds" color="secondary" square clickable removable @remove="
        filter.muscleSupGroupIds = null;
      filter.muscleGroupIds = null;
      filter.muscleSubGroupIds = [];
      ">
        {{ state.muscleSupGroups.find((msg) => msg.id === filter.muscleSupGroupIds)?.name }}
      </q-chip>
      <q-chip v-else v-for="muscleSupGroup in state.muscleSupGroups" :key="muscleSupGroup.id" color="secondary" square
        clickable :outline="muscleSupGroup.id !== filter.selectedMuscleSupGroupId"
        @click="filter.selectedMuscleSupGroupId = muscleSupGroup.id">
        {{ muscleSupGroup.name }}
      </q-chip>

      <q-chip v-if="filter.muscleGroupIds" color="warning" square clickable removable @remove="
        filter.muscleGroupIds = null;
      filter.muscleSubGroupIds = [];
      ">
        {{ state.muscleGroups.find((msg) => msg.id === filter.muscleGroupIds)?.name }}
      </q-chip>
      <q-chip v-else v-for="muscleGroup in state.muscleGroups" :key="muscleGroup.id" color="warning" square clickable
        :outline="muscleGroup.id !== filter.selectedMuscleGroupId" @click="filter.selectedMuscleGroupId = muscleGroup.id">
        {{ muscleGroup.name }}
      </q-chip>

      <q-chip v-for="muscleSubGroup in state.muscleSubGroups" :key="muscleSubGroup.id" color="red" square clickable
        :outline="!filter.selectedMuscleSubGroups.includes(muscleSubGroup.id)" @click="
          filter.selectedMuscleSubGroups.includes(muscleSubGroup.id)
            ? filter.selectedMuscleSubGroups.splice(
              filter.selectedMuscleSubGroups.indexOf(muscleSubGroup.id),
              1
            )
            : filter.selectedMuscleSubGroups.push(muscleSubGroup.id)
          ">
        {{ muscleSubGroup.name }}
      </q-chip>
    </q-tabs>
  </q-toolbar>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount } from 'vue';
import { GetLoadTypeResponse, GetMuscleSupGroupResponse, GetMuscleSubGroupResponse, GetMuscleGroupResponse } from 'src/types/exercises-api/MuscleGroupServiceTypes'
import type { Ref } from 'vue'
import MuscleGroupService from 'src/services/exercises-api/MuscleGroupService';
import { ExerciseFilterRequest } from 'src/types/exercises-api/ExerciseServiceTypes';

const emit = defineEmits<{
  setFilter: [filter: ExerciseFilterRequest]
}>()

const state: State = reactive({
  loadTypes: [],
  muscleSupGroups: [],
  muscleGroups: [],
  muscleSubGroups: [],
});

interface State {
  loadTypes: GetLoadTypeResponse[],
  muscleSupGroups: GetMuscleSupGroupResponse[],
  muscleGroups: GetMuscleGroupResponse[],
  muscleSubGroups: GetMuscleSubGroupResponse[],
}

const filter: Ref<ExerciseFilterRequest> = ref({
  name: null,
  description: null,
  selectedFav: false,
  unilateral: false,
  loadType: '',
  muscleSupGroupIds: '',
  muscleGroupIds: '',
  muscleSubGroupIds: [],
});

onBeforeMount(() => {
  MuscleGroupService.getAllLoadTypes().then((res) => {
    state.loadTypes = res;
  });
  MuscleGroupService.getAllMuscleSupGroups().then((res) => {
    state.muscleSupGroups = res;
  });
  emit('setFilter', filter.value);
});

watch(
  () => filter.value.muscleSupGroupIds,
  () => {
    if (filter.value.muscleSupGroupIds) {
      const mgAux = state.muscleSupGroups.find(
        (msg) => msg.id === filter.value.muscleSupGroupIds
      )?.muscleGroups

      if (mgAux) {
        state.muscleGroups = mgAux
      }
    } else {
      state.muscleGroups = [];
    }
  }
);

watch(
  () => filter.value.muscleGroupIds,
  () => {
    if (filter.value.muscleGroupIds) {
      const msubgAux = state.muscleGroups.find(
        (mg) => mg.id === filter.value.muscleGroupIds
      )?.muscleSubGroups

      if (msubgAux) {
        state.muscleSubGroups = msubgAux
      }
    } else {
      state.muscleSubGroups = [];
    }
  }
);

watch(filter.value, () => {
  emit('setFilter', filter.value);
});

function preSetFilter(
  selectedMuscleSupGroupId: string,
  selectedMuscleGroupId: string,
  selectedMuscleSubGroups: string[],
) {
  filter.value.muscleSupGroupIds = selectedMuscleSupGroupId;
  filter.value.muscleGroupIds = selectedMuscleGroupId;
  filter.value.muscleSubGroupIds = selectedMuscleSubGroups;
}

defineExpose({ preSetFilter })

</script>

<style scoped>
.maxAncho {
  width: 100% !important;
}
</style>
