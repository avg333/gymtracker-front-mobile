<template>
  <div class="row items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("rmCalculator.kg") }}</div>
    <div class="col-6">
      <q-input v-model.number="state.weight" type="number" step="any" />
    </div>
    <div class="col-1">
      <IncrementSelect @changueSelectedIncrement="changueSelectedIncrement" />
    </div>
    <div class="col-3 text-center">
      <IncrementDecrementButtons :numberValue="Number(state.weight)" @increment="state.weight += state.selectedIncrement"
        @decrement="state.weight -= state.selectedIncrement" @setZero="state.weight = 0" />
    </div>
  </div>

  <div class="row items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("rmCalculator.rep") }}</div>
    <div class="col-6">
      <q-input v-model.number="state.reps" type="number" />
    </div>
    <div class="col-1"></div>
    <div class="col-3 text-center">
      <IncrementDecrementButtons :numberValue="Number(state.reps)" @increment="state.reps += 1"
        @decrement="state.reps -= 1" @setZero="state.reps = 0" />
    </div>
  </div>

  <div class="full-space" v-if="state.weight && state.reps">
    <q-separator />
    <div class="row full-space">
      <div class="col-3">Reps</div>
      <div class="col-2"></div>
      <div class="col-7">Estimated Working Weight</div>
    </div>
    <div class="row full-space" v-for="(calculator, idx) in state.calculators" :key="idx">
      <div class="col-3">{{ calculator.reps }} rep</div>
      <div class="col-2">x</div>
      <div class="col-4 text-center">{{ calculator.eww }}</div>
      <div class="col-2">({{ calculator.percentage }}%)</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const coefficients = [
  1, 0.95, 0.93, 0.9, 0.87, 0.85, 0.83, 0.8, 0.77, 0.75, 0.72, 0.7,
];
const defaultSelectedIncrement = 2.5;
import { reactive, computed } from 'vue';
import IncrementDecrementButtons from 'components/IncrementDecrementButtons.vue';
import IncrementSelect from 'components/IncrementSelect.vue';

const props = defineProps({
  defaultWeight: { type: Number, required: false },
  defaultReps: { type: Number, required: false }
})
const state: State = reactive({
  selectedIncrement: defaultSelectedIncrement,
  weight: props.defaultWeight ?? 0,
  reps: props.defaultReps ?? 0,
  calculators: computed(() => getCalculators(maxWeight.value)),
});

interface State {
  selectedIncrement: number,
  weight: number,
  reps: number,
  calculators: Calculators[],
}

interface Calculators {
  reps: number,
  percentage: number,
  eww: number
}

const maxWeight = computed<number>(
  () => state.weight / (1.0278 - 0.0278 * state.reps)
);

function getCalculators(maxPeso: number): Calculators[] {
  const calcs: Calculators[] = [];
  for (let i = 0; i < coefficients.length; i++) {
    const peso = Math.round(maxPeso * coefficients[i]);
    calcs.push({
      reps: i + 1,
      percentage: Math.round((peso / maxPeso) * 100),
      eww: peso,
    });
  }
  return calcs;
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
