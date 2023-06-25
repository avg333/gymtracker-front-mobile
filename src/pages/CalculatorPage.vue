<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title> {{ $t("calculator.title") }} </q-toolbar-title>
      </q-toolbar>
      <q-toolbar>
        <q-tabs v-model="slide" inline-label class="opciones">
          <q-tab name="rm" :label="$t('calculator.rm')" />
          <q-tab name="plate" :label="$t('calculator.plate')" />
        </q-tabs>
      </q-toolbar>
    </div>

    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated
      control-color="primary" height="100%">
      <q-carousel-slide name="rm">
        <RmCalculator :defaultWeight="Number($route.query.weight)" :defaultReps="Number($route.query.reps)" />
      </q-carousel-slide>
      <q-carousel-slide name="plate">
        <PlateCalculator :defaultWeight="Number($route.query.weight)" />
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RmCalculator from 'components/RmCalculator.vue';
import PlateCalculator from 'components/PlateCalculator.vue';
const slide = ref('rm');
</script>

<style scoped>
.opciones {
  width: 100%;
}
</style>
