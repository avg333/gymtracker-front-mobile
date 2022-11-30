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

    <div class="row text-center">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="row">
          <div class="col-12">
            <h5>
              {{ exercise.name }}
            </h5>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div class="row">
          <div class="col-12">&nbsp;</div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-btn
              flat
              :href="'https://www.google.com/search?q=' + exercise.name"
              target="_blank"
            >
              <q-icon name="search" size="lg" />
            </q-btn>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-btn
              flat
              :href="
                'https://www.youtube.com/results?search_query=' + exercise.name
              "
              target="_blank"
            >
              <q-icon name="play_arrow" size="lg" />
            </q-btn>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-icon name="favorite" size="lg" v-if="exercise.favourite" />
            <q-icon name="favorite_border" size="lg" v-else />
          </div>
        </div>
      </div>
    </div>

    <div class="row text-center" v-if="exercise?.muscleGroups">
      <div class="col-12">
        <strong
          v-for="(muscle, index) in exercise.muscleGroups"
          :key="index"
          :class="'text-' + getMuscleGroupColour(muscle)"
        >
          {{ $t("muscleGroup." + muscle.id).toUpperCase() }}
          {{ index + 1 !== exercise.muscleGroups.length ? " - " : "" }}
        </strong>
      </div>
    </div>

    <div class="row text-center" v-if="exercise?.muscleSubGroups">
      <div class="col-12">
        <strong
          v-for="(muscle, index) in exercise.muscleSubGroups"
          :key="index"
        >
          {{ $t("muscleSubGroup." + muscle.id).toUpperCase() }}
          {{ index + 1 !== exercise.muscleSubGroups.length ? " - " : "" }}
        </strong>
      </div>
    </div>

    <div class="row text-center">
      <div class="col-4">ID: {{ exercise.id }}</div>
      <div class="col-4">
        Uni/Bi: {{ exercise.unilateral ? "Unilateral" : "Bilateral" }}
      </div>
      <div class="col-4">
        {{ $t("loadType." + exercise?.loadType?.toLowerCase()) }}
      </div>
    </div>

    <div class="row text-center">
      <div class="col-12">Description:</div>
    </div>
    <div class="row text-center">
      <div class="col-12">{{ exercise.description }}</div>
    </div>
  </q-page>
</template>

<script>
import { getMuscleGroupColour } from "src/utils/colourUtils";
import { ref, defineComponent, reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import ExerciseService from "src/services/ExerciseService";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const slide = ref("rm");

    const exercise = reactive({});
    const route = useRoute();
    onBeforeMount(async () => {
      const res = await ExerciseService.getById(route.params.exerciseId);
      for (const key of Object.keys(res)) exercise[key] = res[key];
    });

    return { exercise, slide, getMuscleGroupColour };
  },
});
</script>
<style scoped>
.opciones {
  width: 100%;
}
</style>
