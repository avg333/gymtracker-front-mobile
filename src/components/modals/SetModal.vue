<template>
  <q-card>
    <q-form @submit="saveSet">
      <q-card-section>
        <div class="row text-h6">
          {{
            setId
              ? $t("modal.setModal.titleEdit", {
                  setNumber: set.listOrder + 1,
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
                query: { weight: set.weight, reps: set.reps },
              })
            "
          />
        </div>
        <div class="span">{{ exercise.name }}</div>
        <div class="text-subtitle3 text-grey" v-if="setId">
          {{ moment(set.lastModifiedAt).format("DD MMM HH:mm") }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row items-center full-space q-col-gutter-sm">
          <div class="col-2 text-right">{{ $t("modal.setModal.kg") }}</div>
          <div class="col-6">
            <q-input v-model="set.weight" type="number" step="any" autofocus />
          </div>
          <div class="col-1">
            <IncrementSelect
              @changueSelectedIncrement="changueSelectedIncrement"
            />
          </div>
          <div class="col-3 text-center">
            <IncrementDecrementButtons
              :numberValue="set.weight"
              @increment="set.weight += selectedIncrement"
              @decrement="set.weight -= selectedIncrement"
              @setZero="set.weight = 0"
            />
          </div>
        </div>

        <div class="row items-center full-space q-col-gutter-sm">
          <div class="col-2 text-right">{{ $t("modal.setModal.rep") }}</div>
          <div class="col-6">
            <q-input v-model="set.reps" type="number" />
          </div>
          <div class="col-1"></div>
          <div class="col-3 text-center">
            <IncrementDecrementButtons
              :numberValue="set.reps"
              @increment="set.reps += 1"
              @decrement="set.reps -= 1"
              @setZero="set.reps = 0"
            />
          </div>
        </div>

        <div class="row items-center full-space q-col-gutter-sm">
          <div class="col-2 text-right">{{ $t("modal.setModal.rir") }}</div>
          <div class="col-6">
            <q-select v-model="set.rir" :options="rirOptions" />
          </div>
          <div class="col-1"></div>
          <div class="col-3 text-center">
            <q-btn-group>
              <q-btn :push="set.rir === 5" dense @click="set.rir = 5">
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
const rirOptions = [0, 0.5, 1, 2, 3, 4, 5];
import moment from "moment";
import { ref, reactive, onBeforeMount } from "vue";
import { useLoginStore } from "stores/login-store";
import SetService from "src/services/SetService";
import SetGroupService from "src/services/SetGroupService";
import ExerciseService from "src/services/ExerciseService";
import IncrementDecrementButtons from "../IncrementDecrementButtons.vue";
import IncrementSelect from "../IncrementSelect.vue";
export default {
  props: {
    setId: Number,
    setGroupId: Number,
    setsSize: Number,
    exerciseId: Number,
  },
  emits: ["closeModal"],
  components: { IncrementDecrementButtons, IncrementSelect },
  setup(props, { emit }) {
    const set = reactive({
      id: props.setId,
      description: "",
      listOrder: -1,
      reps: 0,
      rir: 1,
      weight: 0,
      setGroupId: props.setGroupId,
    });
    const exercise = reactive({});

    onBeforeMount(() => {
      ExerciseService.getById(props.exerciseId).then((res) => {
        for (const key of Object.keys(res)) exercise[key] = res[key];
      });
      if (props.setId)
        SetService.getById(props.setId).then((res) => {
          for (const key of Object.keys(res)) set[key] = res[key];
        });
      else {
        getLastTimeWeightAndReps();
      }
    });

    async function saveSet() {
      props.setId
        ? await SetService.update(props.setId, set)
        : await SetService.create(props.setGroupId, set);
      emit("closeModal");
    }
    async function deleteSet() {
      await SetService.delete(props.setId);
      emit("closeModal");
    }

    const useStore = useLoginStore();
    function getLastTimeWeightAndReps() {
      SetGroupService.getLastExerciseSetGroup(
        useStore.getUserId,
        props.exerciseId
      ).then((setGroup) => {
        if (
          !setGroup ||
          !setGroup.id ||
          !setGroup.sets ||
          setGroup.sets.length < props.setsSize + 1
        ) {
          return;
        }
        const setDb = setGroup.sets[props.setsSize];
        set.reps = setDb.reps;
        set.weight = setDb.weight;
      });
    }

    const selectedIncrement = ref(2.5);
    function changueSelectedIncrement(value) {
      selectedIncrement.value = value;
    }

    return {
      exercise,
      set,
      moment,
      deleteSet,
      saveSet,
      rirOptions,
      selectedIncrement,
      changueSelectedIncrement,
    };
  },
};
</script>
