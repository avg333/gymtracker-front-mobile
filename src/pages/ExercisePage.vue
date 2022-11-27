<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title> {{ exercise.name }} </q-toolbar-title>
        <q-btn-group flat>
          <q-btn flat dense round icon="fitness_center" />
        </q-btn-group>
      </q-toolbar>
      <q-toolbar>
        <div class="row justify-center opciones">
          <q-tabs
            v-model="slide"
            class="opciones text-white bg-black"
            inline-label
          >
            <q-tab name="rm" label="INFORMATION" />
            <q-tab name="plate" label="STATISTICS" />
            <q-tab name="layers" label="HISTORY" />
          </q-tabs>
        </div>
      </q-toolbar>
    </div>
    <p>Group:</p>
    <p>Subgroup:</p>
    <p>WEIGHT & REPS</p>
    <p>
      {{ exercise.loadType }}
    </p>
    {{ exercise }}
    <q-btn flat dense round icon="timer" to="/programs/12/sessions"
  /></q-page>
</template>

<script>
import { ref, defineComponent, reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import ExerciseService from "src/services/ExerciseService";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const slide = ref("rm");

    const exercise = reactive({});
    const route = useRoute();
    onBeforeMount(() => {
      ExerciseService.getById(route.params.exerciseId).then((res) => {
        for (const key of Object.keys(res)) {
          exercise[key] = res[key];
        }
      });
    });

    return { exercise, slide };
  },
});
</script>
<style scoped>
.opciones {
  width: 100%;
}
</style>
