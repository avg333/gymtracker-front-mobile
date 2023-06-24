<template>
  <q-toolbar>
    <q-tabs class="maxAncho">
      <q-chip color="orange" square clickable icon="star" :outline="!filter.selectedFav"
        @click="filter.selectedFav = !filter.selectedFav" />
      <q-chip color="purple" square clickable :outline="!filter.selectedUnilateral"
        @click="filter.selectedUnilateral = !filter.selectedUnilateral">
        {{ $t("muscleGroupPages.filter.unilateral") }}
      </q-chip>
      <q-chip v-for="loadType in state.loadTypes" :key="loadType.id" color="primary" square clickable
        :outline="filter.selectedLoadType !== loadType.id" @click="
          filter.selectedLoadType =
          filter.selectedLoadType === loadType.id ? null : loadType.id
          ">
        {{ loadType.name }}
      </q-chip>
    </q-tabs>
  </q-toolbar>
  <q-toolbar>
    <q-tabs class="maxAncho">
      <q-chip v-if="filter.selectedMuscleSupGroupId" color="secondary" square clickable removable @remove="
        filter.selectedMuscleSupGroupId = null;
      filter.selectedMuscleGroupId = null;
      filter.selectedMuscleSubGroups = [];
      ">
        {{ state.muscleSupGroups.find((msg) => msg.id === filter.selectedMuscleSupGroupId)?.name }}
      </q-chip>
      <q-chip v-else v-for="muscleSupGroup in state.muscleSupGroups" :key="muscleSupGroup.id" color="secondary" square
        clickable :outline="muscleSupGroup.id !== filter.selectedMuscleSupGroupId"
        @click="filter.selectedMuscleSupGroupId = muscleSupGroup.id">
        {{ muscleSupGroup.name }}
      </q-chip>

      <q-chip v-if="filter.selectedMuscleGroupId" color="warning" square clickable removable @remove="
        filter.selectedMuscleGroupId = null;
      filter.selectedMuscleSubGroups = [];
      ">
        {{ state.muscleGroups.find((msg) => msg.id === filter.selectedMuscleGroupId)?.name }}
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

const emit = defineEmits(['setFilter']);

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

const filter: Ref<Filter> = ref({
  selectedFav: false,
  selectedUnilateral: false,
  selectedLoadType: null,
  selectedMuscleSupGroupId: null,
  selectedMuscleGroupId: null,
  selectedMuscleSubGroups: [],
});

interface Filter {
  selectedFav: boolean,
  selectedUnilateral: boolean,
  selectedLoadType: string | null,
  selectedMuscleSupGroupId: string | null,
  selectedMuscleGroupId: string | null,
  selectedMuscleSubGroups: string[],
}

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
  emit('setFilter', filter.value);
});

function preSetFilter(
  selectedMuscleSupGroupId: string,
  selectedMuscleGroupId: string,
  selectedMuscleSubGroups: string[],
) {
  filter.value.selectedMuscleSupGroupId = selectedMuscleSupGroupId;
  filter.value.selectedMuscleGroupId = selectedMuscleGroupId;
  filter.value.selectedMuscleSubGroups = selectedMuscleSubGroups;
}

defineExpose({ preSetFilter })

</script>

<style scoped>
.maxAncho {
  width: 100% !important;
}
</style>
