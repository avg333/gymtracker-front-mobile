<template>
  <q-card>
    <q-card-section>
      <div class="row text-h6">
        {{
          setId
            ? `Set Nº${set.listOrder + 1} of ${setsSize}`
            : `Set Nº${setsSize + 1}`
        }}
        <q-space />
        <q-btn
          flat
          dense
          round
          icon="calculate"
          @click="
            $router.push({
              path: '/calculator/',
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
        <div class="col-2 text-right">KG</div>
        <div class="col-6">
          <q-input v-model="set.weight" type="number" autofocus />
        </div>
        <div class="col-1">
          <q-select
            style="font-size: 0.75em"
            v-model="selectedIncrement"
            :options="increments"
            borderless
            dropdown-icon=" "
          />
        </div>
        <div class="col-3 text-center">
          <q-btn-group flat>
            <q-btn
              flat
              dense
              round
              icon="remove"
              @click="
                set.weight > 0 && set.weight - selectedIncrement.value > 0
                  ? (set.weight -= selectedIncrement.value)
                  : (set.weight = 0)
              "
            />
            <q-btn
              flat
              dense
              round
              icon="add"
              @click="
                set.weight
                  ? (set.weight += selectedIncrement.value)
                  : (set.weight = selectedIncrement.value)
              "
            />
          </q-btn-group>
        </div>
      </div>
      <div class="row items-center full-space q-col-gutter-sm">
        <div class="col-2 text-right">REP</div>
        <div class="col-6">
          <q-input v-model="set.reps" type="number" />
        </div>
        <div class="col-1"></div>
        <div class="col-3 text-center">
          <q-btn-group flat>
            <q-btn
              flat
              dense
              round
              icon="remove"
              @click="set.reps > 0 ? set.reps-- : (set.reps = 0)"
            />
            <q-btn
              flat
              dense
              round
              icon="add"
              @click="set.reps ? set.reps++ : (set.reps = 1)"
            />
          </q-btn-group>
        </div>
      </div>

      <div class="row items-center full-space q-col-gutter-sm">
        <div class="col-2 text-right">RIR</div>
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
      <q-btn flat v-if="setId" @click="deleteSet">{{
        $t("modal.setModal.delete")
      }}</q-btn>
      <q-space />
      <q-btn flat v-close-popup>{{ $t("modal.setModal.cancel") }}</q-btn>
      <q-btn flat @click="saveSet" class="text-positive">
        {{ setId ? $t("modal.setModal.save") : $t("modal.setModal.add") }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
const rirOptions = [0, 0.5, 1, 2, 3, 4, 5];
import moment from "moment";
import { ref, reactive, onBeforeMount } from "vue";
import SetService from "src/services/SetService";
import ExerciseService from "src/services/ExerciseService";
export default {
  props: {
    setId: Number,
    setGroupId: Number,
    setsSize: Number,
    exerciseId: Number,
  },
  emits: ["closeModal"],
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

    const increments = [
      {
        label: "±0.25",
        value: 0.25,
      },
      {
        label: "±0.5",
        value: 0.5,
      },
      {
        label: "±1.0",
        value: 1.0,
      },
      {
        label: "±1.25",
        value: 1.25,
      },
      {
        label: "±2.5",
        value: 2.5,
      },
      {
        label: "±5.0",
        value: 5.0,
      },
    ];
    const selectedIncrement = ref({
      label: "±0.25",
      value: 0.25,
    });

    onBeforeMount(() => {
      ExerciseService.getById(props.exerciseId).then((res) => {
        for (const key of Object.keys(res)) exercise[key] = res[key];
      });
      if (props.setId)
        SetService.getById(props.setId).then((res) => {
          for (const key of Object.keys(res)) set[key] = res[key];
        });
    });

    async function saveSet() {
      props.setId
        ? await SetService.update(props.setId, set)
        : await SetService.create(set);
      emit("closeModal");
    }

    async function deleteSet() {
      await SetService.delete(props.setId);
      emit("closeModal");
    }

    return {
      exercise,
      set,
      moment,
      deleteSet,
      saveSet,
      rirOptions,
      selectedIncrement,
      increments,
    };
  },
};
</script>
