<template>
  <div class="row items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("rmCalculator.kg") }}</div>
    <div class="col-6">
      <q-input v-model="weight" type="number" />
    </div>
    <div class="col-1"></div>
    <div class="col-3 text-center">
      <IncrementDecrementButtons
        :numberValue="weight"
        @increment="weight += 1"
        @decrement="weight -= 1"
        @setZero="weight = 0"
      />
    </div>
  </div>

  <div class="row items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("rmCalculator.rep") }}</div>
    <div class="col-6">
      <q-input v-model="reps" type="number" />
    </div>
    <div class="col-1"></div>
    <div class="col-3 text-center">
      <IncrementDecrementButtons
        :numberValue="reps"
        @increment="reps += 1"
        @decrement="reps -= 1"
        @setZero="reps = 0"
      />
    </div>
  </div>

  <div class="row full-space" v-if="weight && reps">
    <q-separator />
    <div class="row full-space">
      <div class="col-6">Reps</div>
      <div class="col-6">Estimated Working Weight</div>
    </div>
    <div
      class="row full-space"
      v-for="(calculator, index) in calculators"
      :key="index"
    >
      <div class="col-4">{{ calculator.reps }} rep</div>
      <div class="col-2">x</div>
      <div class="col-4">{{ calculator.eww }}</div>
      <div class="col-2">({{ calculator.percentage }}%)</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import IncrementDecrementButtons from "./IncrementDecrementButtons.vue";
export default {
  name: "RmCalculator",
  props: {
    defaultWeight: {
      type: Number,
    },
    defaultReps: {
      type: Number,
    },
  },
  components: { IncrementDecrementButtons },
  setup(props) {
    const weight = ref(props.defaultWeight || 0);
    const reps = ref(props.defaultReps || 0);

    const maxWeight = computed(() => weight.value * (1 + reps.value / 30));
    const calculators = computed(() => getCalculators(maxWeight.value));
    function getCalculators(maxPeso) {
      const calcs = [];
      for (let i = 1; i <= 15; i++) {
        const peso = Math.round(maxPeso / (1 + i / 30));
        calcs.push({
          reps: i,
          percentage: Math.round((peso / maxPeso) * 100),
          eww: peso,
        });
      }
      return calcs;
    }

    return {
      weight,
      reps,
      calculators,
      maxWeight,
    };
  },
};
</script>

<style scoped>
.full-space {
  width: 100%;
}
</style>
