<template>
  <q-card style="width: 400px">
    <q-form @submit="saveExercise">
      <q-card-section>
        <div class="row text-h6">
          <div class="col-12">
            {{ exerciseId ? `Editar ${exercise.name}` : `Nuevo ejercicio` }}
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input v-model="exercise.name" label="Nombre *" :rules="[
              (val) =>
                (val && val.length > 10 && val.length < 100) ||
                'Must match password.',
            ]" />
            <q-select v-model="exercise.loadType" :options="loadTypes" label="Tipo de carga *" />
            <q-input v-model="exercise.description" label="Descripción" />
            <q-btn-toggle v-model="exercise.unilateral" spread no-caps unelevated :options="[
              { label: 'Bilateral', value: false },
              { label: 'Unilateral', value: true },
            ]" />
            <q-select filled v-model="exercise.muscleSubGroups" multiple :options="muscleSubGroups" option-label="name"
              label="MuscleSubGroups" />
            <div class="row" v-for="(
                muscleGroupExercises, index
              ) in exercise.muscleGroupExercises" :key="index">
              <div class="col-10">
                <q-select filled v-model="exercise.muscleGroupExercises[index].muscleGroup" :options="muscleGroups"
                  option-label="name" label="MuscleGroups" />
                <q-input v-model="exercise.muscleGroupExercises[index].weight" label="Weight" type="number" />
              </div>
              <div class="col-2">
                <q-btn dense class="full-width" @click="exercise.muscleGroupExercises.splice(index, 1)">
                  <q-icon name="remove" />
                </q-btn>
              </div>
            </div>
            <q-btn dense class="full-width" @click="addMuscleGroup()">
              <div>Añadir Grupo Muscular</div>
              <q-icon name="add" />
            </q-btn>
          </div>
        </div>
        <div class="password-criteria q-pa-sm">
          <div class="text-subtitle2 q-mb-sm">Password Criteria:</div>
          <div>
            <q-icon name="cancel" color="negative" />
            Must contain at least one symbol.
          </div>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat v-if="exerciseId" @click="deleteExercise">
          {{ $t("modal.setModal.delete") }}
        </q-btn>
        <q-space />
        <q-btn flat v-close-popup>{{ $t("modal.setModal.cancel") }}</q-btn>
        <q-btn flat class="text-positive" type="submit">
          {{
            exerciseId ? $t("modal.setModal.save") : $t("modal.setModal.add")
          }}
        </q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { LoadTypeEnum } from 'src/utils/enums';
import { ref, reactive, onBeforeMount, watchEffect } from 'vue';
import ExerciseService from 'src/services/exercises-api/ExerciseService';
import MuscleGroupService from 'src/services/exercises-api/MuscleGroupService';

const props = defineProps({
  exerciseId: Number,
});
const emit = defineEmits(['closeModal']);

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
});

watchEffect(() => {
  muscleSubGroups.value = [];
  if (!exercise || !exercise.muscleGroupExercises.length) return;
  for (const muscleGroupId of exercise.muscleGroupExercises.map(
    (mge) => mge.muscleGroup.id
  )) {
    if (muscleGroupId)
      MuscleGroupService.getAllMuscleGroupMuscleSubGroups(
        muscleGroupId
      ).then((res) => muscleSubGroups.value.push(...res));
  }
});

function addMuscleGroup() {
  exercise.muscleGroupExercises.push({
    muscleGroup: { name: '' },
    exercise: {},
    weight: 0,
  });
}

async function saveExercise() {
  props.exerciseId
    ? await ExerciseService.update(props.exerciseId, exercise)
    : await ExerciseService.create(exercise);
  emit('closeModal');
}

async function deleteExercise() {
  await ExerciseService.delete(props.exerciseId);
  emit('closeModal');
}
</script>
