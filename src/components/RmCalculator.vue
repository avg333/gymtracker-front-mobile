<template>
  <div class="row items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">WEIGHT</div>
    <div class="col-6">
      <q-input v-model="weight" type="number" />
    </div>
    <div class="col-1"></div>
    <div class="col-3 text-center">
      <q-btn-group flat>
        <q-btn
          flat
          dense
          round
          icon="remove"
          @click="weight > 0 ? weight-- : (weight = 0)"
        />
        <q-btn
          flat
          dense
          round
          icon="add"
          @click="weight ? weight++ : (weight = 1)"
        />
      </q-btn-group>
    </div>
  </div>
  <div class="row items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">REP</div>
    <div class="col-6">
      <q-input v-model="reps" type="number" />
    </div>
    <div class="col-1"></div>
    <div class="col-3 text-center">
      <q-btn-group flat>
        <q-btn
          flat
          dense
          round
          icon="remove"
          @click="reps > 0 ? reps-- : (reps = 0)"
        />
        <q-btn
          flat
          dense
          round
          icon="add"
          @click="reps ? reps++ : (reps = 1)"
        />
      </q-btn-group>
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
