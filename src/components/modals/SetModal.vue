<template>
  <q-card>
    <q-form @submit="saveSet">
      <q-card-section>
        <div class="row text-h6">
          {{
            setId
              ? $t("modal.setModal.titleEdit", {
                  setNumber: state.set?.listOrder + 1,
                  setsSize,
                })
              : $t("modal.setModal.titleNew", {
                  setsSize: setsSize + 1,
                })
          }}
          <q-space />
          <q-btn
            flat
            dense
            round
            icon="calculate"
            @click="
              $router.push({
                name: 'calculator',
                query: { weight: state.set.weight, reps: state.set.reps },
              })
            "
          />
        </div>

        <div class="span">{{ state.exercise?.name }}</div>
        <div class="text-subtitle3 text-grey" v-if="state.set?.id">
          {{ dateToTimeStamp(state.set.lastModifiedAt) }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row items-center full-space q-col-gutter-sm">
          <div class="col-2 text-right">{{ $t("modal.setModal.kg") }}</div>
          <div class="col-6">
            <q-input
              v-model.number="state.set.weight"
              type="number"
              step="any"
              autofocus
            />
          </div>
          <div class="col-1">
            <IncrementSelect
              @changueSelectedIncrement="changueSelectedIncrement"
            />
          </div>
          <div class="col-3 text-center">
            <IncrementDecrementButtons
              :numberValue="Number(state.set.weight)"
              @increment="state.set.weight += state.selectedIncrement"
              @decrement="state.set.weight -= state.selectedIncrement"
              @setZero="state.set.weight = 0"
            />
          </div>
        </div>

        <div class="row items-center full-space q-col-gutter-sm">
          <div class="col-2 text-right">{{ $t("modal.setModal.rep") }}</div>
          <div class="col-6">
            <q-input v-model.number="state.set.reps" type="number" />
          </div>
          <div class="col-1"></div>
          <div class="col-3 text-center">
            <IncrementDecrementButtons
              :numberValue="state.set.reps"
              @increment="state.set.reps += 1"
              @decrement="state.set.reps -= 1"
              @setZero="state.set.reps = 0"
            />
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
              <q-btn
                dense
                :push="state.set.rir < efectiveRir"
                @click="state.set.rir = efectiveRir + 1"
              >
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

<script>
//READY!
const rirOptions = [0, 0.5, 1, 2, 3, 4, 5];
const efectiveRir = 4;
import { reactive, onBeforeMount } from "vue";
import { useLoginStore } from "stores/login-store";
import IncrementDecrementButtons from "components/IncrementDecrementButtons.vue";
import IncrementSelect from "components/IncrementSelect.vue";
import SetService from "src/services/SetService";
import SetGroupService from "src/services/SetGroupService";
import ExerciseService from "src/services/ExerciseService";
import { dateToTimeStamp } from "src/utils/dateFormater";
export default {
  name: "SetModal",
  emits: ["closeModal"],
  props: {
    setId: Number,
    setGroupId: Number,
    setsSize: Number,
    exerciseId: Number,
  },
  components: { IncrementDecrementButtons, IncrementSelect },
  setup(props, { emit }) {
    const useStore = useLoginStore();

    const state = reactive({
      selectedIncrement: 2.5,
      set: {
        id: props.setId,
        description: "",
        listOrder: -1,
        reps: undefined,
        rir: 2,
        weight: undefined,
        setGroupId: props.setGroupId,
      },
      exercise: {},
    });

    onBeforeMount(async () => {
      ExerciseService.getById(props.exerciseId).then((res) => {
        state.exercise = res;
      });
      props.setId ? await getSet() : getLastTimeWeightAndReps();
    });

    async function saveSet() {
      props.setId
        ? await SetService.update(props.setId, state.set)
        : await SetService.create(props.setGroupId, state.set);
      emit("closeModal");
    }
    async function deleteSet() {
      await SetService.delete(props.setId);
      emit("closeModal");
    }

    async function getSet() {
      const res = await SetService.getById(props.setId);
      if (res.ok) {
        state.set = res.data;
        return;
      } //TODO Tratar casos de error
    }

    function getLastTimeWeightAndReps() {
      //TODO Obtener datos ultima set
      SetGroupService.getLastExerciseSetGroup(
        useStore.getUserId,
        props.exerciseId
      ).then((setGroup) => {
        if (setGroup?.id && setGroup?.sets?.length >= props.setsSize + 1) {
          const setDb = setGroup.sets[props.setsSize];
          state.set.reps = setDb.reps;
          state.set.weight = setDb.weight;
        }
      });
    }

    function changueSelectedIncrement(value) {
      state.selectedIncrement = value;
    }

    return {
      state,
      saveSet,
      deleteSet,
      changueSelectedIncrement,
      efectiveRir,
      rirOptions,
      dateToTimeStamp,
    };
  },
};
</script>
