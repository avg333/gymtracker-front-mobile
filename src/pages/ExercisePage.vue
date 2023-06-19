<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title> {{ state.exercise?.name }} </q-toolbar-title>
        <q-btn-group flat>
          <q-btn flat dense round icon="fitness_center" />
        </q-btn-group>
      </q-toolbar>
      <q-toolbar>
        <div class="row justify-center opciones">
          <q-tabs v-model="state.slide" class="opciones text-white bg-black" inline-label>
            <q-tab :name="categories.description" label="INFORMATION" />
            <q-tab :name="categories.statistics" label="STATISTICS" />
            <q-tab :name="categories.history" label="HISTORY" />
          </q-tabs>
        </div>
      </q-toolbar>
    </div>

    <q-carousel v-model="state.slide" transition-prev="slide-right" transition-next="slide-left" animated
      control-color="primary" height="100%">
      <q-carousel-slide :name="categories.description">
        <ExerciseDescription :exercise="state.exercise" />
      </q-carousel-slide>
      <q-carousel-slide :name="categories.statistics">
        Sin implementar
      </q-carousel-slide>
      <q-carousel-slide :name="categories.history">
        <SetGroupCard v-for="setGroup in state.setGroups" class="bg-grey-1 items-center" :key="setGroup.id"
          :setGroup="setGroup" :onlyRead="true" />
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
const categories = {
  description: 'description',
  statistics: 'statistics',
  history: 'history',
};
import { defineComponent, reactive, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useLoginStore } from 'stores/login-store';
import ExerciseService from 'src/services/exercises-api/ExerciseService';
import SetGroupService from 'src/services/workouts-api/SetGroupService';
import SetGroupCard from 'src/components/cards/SetGroupCard.vue';
import ExerciseDescription from 'src/components/exercise/ExerciseDescription.vue';
export default defineComponent({
  name: 'ExercisePage',
  components: { SetGroupCard, ExerciseDescription },
  setup() {
    const route = useRoute();
    const store = useLoginStore();

    const state = reactive({
      slide: categories.description,
      exercise: {},
      setGroups: [],
    });

    onBeforeMount(async () => {
      ExerciseService.getById(route.params.exerciseId).then((res) => {
        state.exercise = res;
      });
      SetGroupService.getExerciseHistory(
        store.getUserId,
        route.params.exerciseId
      ).then((res) => {
        state.setGroups = res;
      });
    });

    return { categories, state };
  },
});
</script>
<style scoped>
.opciones {
  width: 100%;
}
</style>
