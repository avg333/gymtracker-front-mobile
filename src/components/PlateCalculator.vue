<template>
  <div class="row g-0 items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("plateCalculator.kg") }}</div>
    <div class="col-6">
      <q-input v-model="weight" type="number" />
    </div>
    <div class="col-1">
      <IncrementSelect
        :selectedValue="selectedIncrement"
        @changueSelectedIncrement="changueSelectedIncrement"
      />
    </div>
    <div class="col-3 text-center">
      <IncrementDecrementButtons
        :numberValue="weight"
        @increment="weight += selectedIncrement"
        @decrement="weight -= selectedIncrement"
        @setZero="weight = 0"
      />
    </div>
  </div>

  <div class="row g-0 items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("plateCalculator.bar") }}</div>
    <div class="col-10">
      <q-chip
        v-for="bar in bars"
        :key="bar"
        :outline="selectedBar === bar"
        square
        clickable
        @click="selectedBar = bar"
      >
        {{ bar }}
      </q-chip>
      <q-btn flat dense round icon="add" />
    </div>
  </div>

  <div class="row g-0 items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("plateCalculator.plates") }}</div>
    <div class="col-10">
      <q-chip
        v-for="plate in plates"
        :key="plate"
        :outline="selectedPlates.indexOf(plate) <= -1"
        square
        clickable
        @click="
          selectedPlates.indexOf(plate) > -1
            ? selectedPlates.splice(selectedPlates.indexOf(plate), 1)
            : selectedPlates.push(plate)
        "
      >
        {{ plate }}
      </q-chip>
      <q-btn flat dense round icon="add" />
    </div>
  </div>

  <q-separator />

  <div
    class="row g-0 items-center full-space text-center"
    v-if="weight && weight > estimatedWeight"
  >
    <div class="col-12">
      <div class="row">
        <div class="col-12 text-h6">
          {{ $t("plateCalculator.bar") }}
          {{ selectedBar }}
          {{ $t("plateCalculator.kg") }}
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-subtitle1">
          {{ $t("plateCalculator.resumenDiscos") }}
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <q-chip
            v-for="(plate, index) in neededPlates"
            :key="index"
            size="xl"
            color="teal"
          >
            {{ plate }}
          </q-chip>
        </div>
      </div>
    </div>
  </div>

  <div
    class="row g-0 items-center full-space text-center text-overline"
    v-if="weight && weight != estimatedWeight"
  >
    <div class="col-12">
      <div class="row" v-if="weight < estimatedWeight">
        <div class="col-12">{{ $t("plateCalculator.pesoInferior") }}</div>
      </div>
      <div class="row" v-else>
        <div class="col-12">
          {{ $t("plateCalculator.faltanDiscos1") }}
          <q-chip color="red" square :label="weight - estimatedWeight" />
          {{ $t("plateCalculator.faltanDiscos2") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const bars = [20, 15, 10, 5];
const plates = [50, 25, 20, 15, 10, 5, 2.5, 1.25, 1, 0.5, 0.25, 0.125];
const defaultSelectedBar = 20;
const defaultSelectedPlates = [20, 15, 10, 5, 2.5, 1.25];
import { ref, computed } from "vue";
import IncrementSelect from "./IncrementSelect.vue";
import IncrementDecrementButtons from "./IncrementDecrementButtons.vue";
export default {
  name: "PlateCalculator",
  components: { IncrementDecrementButtons, IncrementSelect, IncrementSelect },
  props: {
    defaultWeight: {
      type: Number,
    },
  },
  setup(props) {
    const weight = ref(props.defaultWeight || 0);
    const selectedBar = ref(defaultSelectedBar);
    const selectedPlates = ref(defaultSelectedPlates);

    const neededPlates = computed(() =>
      getNeededPlates(weight.value, selectedBar.value, selectedPlates.value)
    );

    const estimatedWeight = computed(
      () =>
        neededPlates.value.reduce((partialSum, a) => partialSum + a * 2, 0) +
        selectedBar.value
    );

    function getNeededPlates(peso, pesoBarra, platosDiponibles) {
      platosDiponibles.sort(function (a, b) {
        return a - b;
      });
      platosDiponibles.reverse();

      const platosNecesarios = [];
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

    const selectedIncrement = ref(2.5);
    function changueSelectedIncrement(value) {
      selectedIncrement.value = value;
    }

    return {
      weight,
      bars,
      plates,
      selectedBar,
      selectedPlates,
      neededPlates,
      estimatedWeight,
      selectedIncrement,
      changueSelectedIncrement,
    };
  },
};
</script>
<style scoped>
.full-space {
  width: 100%;
}
</style>
