<template>
  <q-card style="width: 400px">
    <q-card-section>
      <div class="row">
        <div class="col-12">
          <q-input v-model="exercise.name" label="Name" />
          <q-select
            v-model="exercise.loadType"
            :options="loadTypes"
            label="LoadType"
          />
          <q-input v-model="exercise.description" label="Description" />
          <q-btn-toggle
            v-model="exercise.unilateral"
            class="my-custom-toggle"
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: 'Bilateral', value: false },
              { label: 'Unilateral', value: true },
            ]"
          />
          <q-select
            filled
            v-model="exercise.muscleSubGroups"
            multiple
            :options="muscleSubGroups"
            option-label="name"
            label="MuscleSubGroups"
          />
          <q-btn flat dense round icon="add" @click="addMuscleGroup()" />
          <div
            class="row"
            v-for="(
              muscleGroupExercises, index
            ) in exercise.muscleGroupExercises"
            :key="index"
          >
            <div class="col-12">
              <q-select
                filled
                v-model="exercise.muscleGroupExercises[index].muscleGroup"
                :options="muscleGroups"
                option-label="name"
                label="MuscleGroups"
              />
              <q-input
                v-model="exercise.muscleGroupExercises[index].weight"
                label="Weight"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn flat v-if="exerciseId" @click="deleteExercise"> Eliminar </q-btn>
      <q-space />
      <q-btn flat v-close-popup>Cancelar</q-btn>
      <q-btn flat @click="saveExercise" class="text-positive">
        {{ exerciseId ? "Guardar" : "Añadir" }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { LoadTypeEnum } from "src/utils/enums";
import { ref, reactive, onBeforeMount, watchEffect } from "vue";
import ExerciseService from "src/services/ExerciseService";
import MuscleGroupService from "src/services/MuscleGroupService";
export default {
  props: {
    exerciseId: Number,
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const exercise = reactive({
      id: props.exerciseId,
      name: null,
      description: null,
      unilateral: false,
      loadType: null,
      muscleGroupExercises: [],
      muscleSubGroups: [],
    });

    const loadTypes = Object.values(LoadTypeEnum);
    const muscleSubGroups = ref([]);
    const muscleGroups = ref([]);

    onBeforeMount(() => {
      if (props.exerciseId)
        ExerciseService.getById(props.exerciseId).then((res) => {
          for (const key of Object.keys(res)) exercise[key] = res[key];
        });
      MuscleGroupService.getAllMuscleGroups().then((res) => {
        muscleGroups.value = res;
      });
      MuscleGroupService.getAllMuscleGroupMuscleSubGroups(1).then((res) => {
        muscleSubGroups.value = res;
      });
    });

    function addMuscleGroup() {
      exercise.muscleGroupExercises.push({
        muscleGroup: null,
        weight: null,
        exercise: null,
      });
    }
    /*
    watchEffect(() => {
      muscleSubGroups.value = [];
      if (!exercise || !exercise.muscleGroupExercises.length) return;
      for (const muscleGroup of exercise.muscleGroupExercises) {
        MuscleGroupService.getAllMuscleGroupMuscleSubGroups(
          muscleGroup.id
        ).then((res) => muscleSubGroups.value.push(...res));
      }
    });
    */

    async function saveExercise() {
      props.exerciseId
        ? await ExerciseService.update(props.exerciseId, exercise)
        : await ExerciseService.create(exercise);
      emit("closeModal");
    }

    async function deleteExercise() {
      await ExerciseService.delete(props.exerciseId);
      emit("closeModal");
    }

    return {
      exercise,
      muscleSubGroups,
      muscleGroups,
      saveExercise,
      deleteExercise,
      loadTypes,
      addMuscleGroup,
    };
  },
};
</script>
