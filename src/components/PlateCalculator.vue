<template>
  <div class="row g-0 items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("plateCalculator.kg") }}</div>
    <div class="col-6">
      <q-input v-model.number="state.weight" type="number" step="any" />
    </div>
    <div class="col-1">
      <IncrementSelect @changueSelectedIncrement="changueSelectedIncrement" />
    </div>
    <div class="col-3 text-center">
      <IncrementDecrementButtons :numberValue="state.weight" @increment="state.weight += state.selectedIncrement"
        @decrement="state.weight -= state.selectedIncrement" @setZero="state.weight = 0" />
    </div>
  </div>

  <div class="row g-0 items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("plateCalculator.bar") }}</div>
    <div class="col-10">
      <q-chip v-for="bar in bars" :key="bar" :outline="state.selectedBar === bar" square clickable
        @click="state.selectedBar = bar">
        {{ bar }}
      </q-chip>
      <q-btn flat dense round icon="add" />
    </div>
  </div>

  <div class="row g-0 items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("plateCalculator.plates") }}</div>
    <div class="col-10">
      <q-chip v-for="plate in plates" :key="plate" :outline="state.selectedPlates.includes(plate)" square clickable
        @click="
          state.selectedPlates.includes(plate)
            ? state.selectedPlates.splice(
              state.selectedPlates.indexOf(plate),
              1
            )
            : state.selectedPlates.push(plate)
          ">
        {{ plate }}
      </q-chip>
      <q-btn flat dense round icon="add" />
    </div>
  </div>

  <q-separator />

  <div class="items-center full-space text-center" v-if="state.weight >= state.estimatedWeight">
    <div class="text-h6">
      {{ $t("plateCalculator.bar") }}
      {{ state.selectedBar }}
      {{ $t("plateCalculator.kg") }}
    </div>
    <div class="text-subtitle1">
      {{ $t("plateCalculator.resumenDiscos") }}
    </div>
    <div>
      <q-chip v-for="(plate, idx) in state.neededPlates" :key="idx" size="xl" color="teal">
        {{ plate }}
      </q-chip>
    </div>
  </div>

  <div v-if="state.weight < state.estimatedWeight">
    {{ $t("plateCalculator.pesoInferior") }}
  </div>
  <div v-else-if="state.weight > state.estimatedWeight">
    {{ $t("plateCalculator.faltanDiscos1") }}
    <q-chip color="red" square :label="state.weight - state.estimatedWeight" />
    {{ $t("plateCalculator.faltanDiscos2") }}
  </div>
</template>

<script setup lang="ts">
const bars = [20, 15, 10, 5];
const plates = [50, 25, 20, 15, 10, 5, 2.5, 1.25, 1, 0.5, 0.25, 0.125];
const defaultSelectedIncrement = 2.5;
import { reactive, computed, watchEffect } from 'vue';
import IncrementSelect from 'components/IncrementSelect.vue';
import IncrementDecrementButtons from 'components/IncrementDecrementButtons.vue';
import { useSettingsStore } from 'stores/settings-store';
const props = defineProps({ defaultWeight: Number })
const useStore = useSettingsStore();
const state: State = reactive({
  selectedIncrement: defaultSelectedIncrement,
  weight: props.defaultWeight ?? 0,
  selectedBar: useStore.selectedBar,
  selectedPlates: useStore.selectedPlates,
  neededPlates: computed(() =>
    getNeededPlates(state.weight, state.selectedBar, state.selectedPlates)
  ),
  estimatedWeight: computed(
    () =>
      state.neededPlates.reduce((partialSum: number, a: number) => partialSum + a * 2, 0) +
      state.selectedBar
  ),
});

interface State {
  selectedIncrement: number,
  weight: number,
  selectedBar: number,
  selectedPlates: number[],
  neededPlates: number[],
  estimatedWeight: number,
}

watchEffect(() => {
  useStore.setSelectedBar(state.selectedBar);
});

watchEffect(() => {
  useStore.setSelectedPlates(state.selectedPlates);
});

function getNeededPlates(peso: number, pesoBarra: number, platosDiponibles: number[]): number[] {
  if (!peso) {
    return [];
  }

  platosDiponibles.sort(function (a, b) {
    return a - b;
  });
  platosDiponibles.reverse();

  const platosNecesarios: number[] = [];
  let pesoCalc = peso - pesoBarra;
  let i = 0;
  while (i < platosDiponibles.length) {
    if (platosDiponibles[i] * 2 > pesoCalc) {
      i++;
    } else {
      platosNecesarios.push(platosDiponibles[i]);
      pesoCalc -= platosDiponibles[i] * 2;
    }
  }

  return platosNecesarios;
}

function changueSelectedIncrement(value: number) {
  state.selectedIncrement = value;
}
</script>

<style scoped>
.full-space {
  width: 100%;
}
</style>
