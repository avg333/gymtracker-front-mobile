<template>
  <div class="row g-0 items-center full-space q-col-gutter-sm">
    <div class="col-2 text-right">{{ $t("plateCalculator.kg") }}</div>
    <div class="col-6">
      <q-input v-model="weight" type="number" />
    </div>
    <div class="col-1">
      <q-select
        v-model="selectedIncrement"
        :options="increments"
        borderless
        dropdown-icon=" "
      />
    </div>
    <div class="col-3 text-center">
      <q-btn-group flat>
        <q-btn
          flat
          dense
          round
          icon="remove"
          @click="
            weight > 0 && weight - selectedIncrement.value > 0
              ? (weight -= selectedIncrement.value)
              : (weight = 0)
          "
        />
        <q-btn
          flat
          dense
          round
          icon="add"
          @click="
            weight
              ? (weight += selectedIncrement.value)
              : (weight = selectedIncrement.value)
          "
        />
      </q-btn-group>
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
import { ref, computed } from "vue";
export default {
  name: "PlateCalculator",
  props: {
    defaultWeight: {
      type: Number,
    },
  },
  setup(props) {
    const weight = ref(props.defaultWeight || 0);

    const bars = [20, 15, 10, 5];
    const plates = [50, 25, 20, 15, 10, 5, 2.5, 1.25, 1, 0.5, 0.25, 0.125];
    const increments = [
      {
        label: "±0.25",
        value: 0.25,
      },
      {
        label: "±0.5",
        value: 0.5,
      },
      {
        label: "±1.0",
        value: 1.0,
      },
      {
        label: "±1.25",
        value: 1.25,
      },
      {
        label: "±2.5",
        value: 2.5,
      },
      {
        label: "±5.0",
        value: 5.0,
      },
    ];
    const selectedIncrement = ref({
      label: "±0.25",
      value: 0.25,
    });
    const selectedBar = ref(20);
    const selectedPlates = ref([20, 15, 10, 5, 2.5, 1.25]);

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

    return {
      weight,
      bars,
      plates,
      selectedBar,
      selectedPlates,
      neededPlates,
      estimatedWeight,
      increments,
      selectedIncrement,
    };
  },
};
</script>
<style scoped>
.full-space {
  width: 100%;
}
</style>
