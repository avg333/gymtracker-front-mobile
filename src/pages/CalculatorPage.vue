<template>
  <div class="bg-black text-white">
    <q-toolbar>
      <q-btn flat dense round icon="arrow_back" @click="$router.back" />
      <q-toolbar-title> Calculator </q-toolbar-title>
      <q-space />
    </q-toolbar>
    <q-toolbar>
      <div class="row opciones">
        <q-tabs
          v-model="slide"
          class="opciones text-white bg-black"
          inline-label
        >
          <q-tab name="rm" label="WORKING WEIGHT" />
          <q-tab name="plate" label="PLATE CALCULATOR" />
        </q-tabs>
      </div>
    </q-toolbar>
  </div>
  <q-page>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      height="100%"
    >
      <q-carousel-slide name="rm">
        <RmCalculator
          :defaultWeight="Number($route.query.weight)"
          :defaultReps="Number($route.query.reps)"
        />
      </q-carousel-slide>
      <q-carousel-slide name="plate">
        <PlateCalculator :defaultWeight="Number($route.query.weight)" />
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { ref } from "vue";
import RmCalculator from "components/RmCalculator.vue";
import PlateCalculator from "components/PlateCalculator.vue";
export default {
  name: "CalculatorPage",
  components: { RmCalculator, PlateCalculator },
  setup() {
    const slide = ref("rm");
    return {
      slide,
    };
  },
};
</script>
<style scoped>
.opciones {
  width: 100%;
}
</style>
