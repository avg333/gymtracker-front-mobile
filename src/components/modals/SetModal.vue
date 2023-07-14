<template>
  <q-card>
    <q-form @submit="saveSet">
      <q-card-section>
        <div class="row text-h6">
          {{
            setId
            ? $t("modal.setModal.titleEdit", {
              setNumber: state.set.listOrder + 1,
              setsSize,
            })
            : $t("modal.setModal.titleNew", {
              setsSize: setsSize + 1,
            })
          }}
          <q-space />
          <q-btn flat dense round icon="calculate" @click="
          $router.push({
            name: 'calculator',
            query: { weight: state.set.weight, reps: state.set.reps },
          })
            " />
        </div>

        <div class="span">{{ state.exercise?.name }}</div>
        <div class="text-subtitle3 text-grey" v-if="state.set.id">
          <div class="text-subtitle3 text-grey" v-if="state.set?.completedAt">
            {{ dateToTimeStamp(state.set.completedAt) }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row items-center full-space q-col-gutter-sm">
          <div class="col-2 text-right">{{ $t("modal.setModal.kg") }}</div>
          <div class="col-6">
            <q-input v-model.number="state.set.weight" type="number" step="any" autofocus />
          </div>
          <div class="col-1">
            <IncrementSelect @changueSelectedIncrement="changueSelectedIncrement" />
          </div>
          <div class="col-3 text-center">
            <IncrementDecrementButtons :numberValue="Number(state.set.weight)"
              @increment="state.set.weight += state.selectedIncrement"
              @decrement="state.set.weight -= state.selectedIncrement" @setZero="state.set.weight = 0" />
          </div>
        </div>

        <div class="row items-center full-space q-col-gutter-sm">
          <div class="col-2 text-right">{{ $t("modal.setModal.rep") }}</div>
          <div class="col-6">
            <q-input v-model.number="state.set.reps" type="number" />
          </div>
          <div class="col-1"></div>
          <div class="col-3 text-center">
            <IncrementDecrementButtons :numberValue="state.set.reps" @increment="state.set.reps += 1"
              @decrement="state.set.reps -= 1" @setZero="state.set.reps = 0" />
          </div>
        </div>

        <div class="row items-center full-space q-col-gutter-sm">
          <div class="col-2 text-right">{{ $t("modal.setModal.rir") }}</div>
          <div class="col-6">
            <q-select v-model="state.set.rir" :options="rirOptions" />
          </div>
          <div class="col-1"></div>
          <div class="col-3 text-center">
            <q-btn-group>
              <q-btn dense :push="state.set.rir < efectiveRir" @click="state.set.rir = efectiveRir + 1">
                {{ $t("modal.setModal.warmup") }}
              </q-btn>
            </q-btn-group>
          </div>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat class="text-negative" v-if="setId" @click="deleteSet">
          {{ $t("modal.setModal.delete") }}
        </q-btn>
        <q-space />
        <q-btn flat v-close-popup>{{ $t("modal.setModal.cancel") }}</q-btn>
        <q-btn flat class="text-positive" type="submit">
          {{ setId ? $t("modal.setModal.save") : $t("modal.setModal.add") }}
        </q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
const rirOptions = [0, 0.5, 1, 2, 3, 4, 5];
const efectiveRir = 4;
const defaultSelectedIncrement = 2.5
import { reactive, onBeforeMount } from 'vue';
import IncrementDecrementButtons from 'components/IncrementDecrementButtons.vue';
import IncrementSelect from 'components/IncrementSelect.vue';
import SetService from 'src/services/workouts-api/SetService';
import { GetSetResponse } from 'src/types/workouts-api/SetServiceTypes';
import ExerciseService from 'src/services/exercises-api/ExerciseService';
import { Exercise } from 'src/types/exercises-api/ExerciseServiceTypes';
import { dateToTimeStamp } from 'src/utils/dateFormater';

const props = defineProps({
  setId: { type: String, required: false, default: '' }, //TODO Evitar este default ''
  setGroupId: { type: String, required: true },
  setsSize: { type: Number, required: true },
  exerciseId: { type: String, required: true }
});
const emit = defineEmits<{
  closeModal: []
}>()
const state: State = reactive({
  selectedIncrement: defaultSelectedIncrement,
  set: {
    id: props.setId,
    listOrder: 0,
    description: '',
    reps: 1,
    rir: 2,
    weight: 1,
    completedAt: null,
    setGroup: { id: props.setGroupId },
  },
  exercise: null,
});

interface State {
  selectedIncrement: number
  set: GetSetResponse,
  exercise: Exercise | null
}

onBeforeMount(async () => {
  ExerciseService.getById(props.exerciseId).then((res) => {
    state.exercise = res;
  });
  props.setId ? await getSet() : getLastTimeWeightAndReps();
});

async function saveSet() {
  const requets = {
    description: state.set.description,
    reps: state.set.reps,
    rir: state.set.rir,
    weight: state.set.weight,
    completed: true,
  };
  props.setId
    ? await SetService.updateData(props.setId, requets)
    : await SetService.create(props.setGroupId, requets);
  emit('closeModal');
}
async function deleteSet() {
  if (!props.setId) {
    console.warn('El setId es null y no se puede eliminar la set');
    return;
  }

  await SetService.delete(props.setId);
  emit('closeModal');
}

async function getSet() {
  if (!props.setId) {
    console.warn('El setId es null y no se puede obtener la set');
    return;
  }

  const set: GetSetResponse | null = await SetService.getById(props.setId);
  if (set) {
    state.set = set;
  } else {
    console.warn(`No se ha podido obtener la set ${props.setId}`)
  }
}

function getLastTimeWeightAndReps() {
  SetService.getSetDefaultWeight(props.setGroupId).then((set) => {
    if (set) {
      state.set.description = set.description;
      state.set.reps = set.reps;
      state.set.weight = set.weight;
      state.set.rir = set.rir;
    }
  });
}

function changueSelectedIncrement(value: number) {
  state.selectedIncrement = value;
}
</script>
