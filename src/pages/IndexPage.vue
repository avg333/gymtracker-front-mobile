<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <LeftDrawner />
  </q-drawer>

  <q-dialog v-model="setModalData.visible">
    <SetModal
      :setId="setModalData.setId"
      :setGroupId="setModalData.setGroupId"
      :setsSize="setModalData.setsSize"
      :exerciseId="setModalData.exerciseId"
      @closeModal="
        getWorkoutAndSets();
        setModalData.visible = false;
      "
    />
  </q-dialog>

  <q-dialog v-model="modalChangeDate">
    <ChangeWorkoutDateModal
      :workoutId="workout.id"
      @closeModal="
        getWorkoutAndSets();
        modalChangeDate = false;
      "
    />
  </q-dialog>

  <q-page class="bg-grey-4">
    <q-toolbar class="bg-black text-white">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="leftDrawerOpen = !leftDrawerOpen"
      />
      <q-chip class="text-white" square color="positive" v-if="today == date">
        <strong> Today </strong>
      </q-chip>
      <span v-else>
        <strong>
          {{ moment(date).format("DD MMM") }}
        </strong>
      </span>
      <q-space />
      <q-btn-group flat>
        <q-btn flat dense round icon="timer" />
        <q-btn
          flat
          dense
          round
          icon="today"
          @click="date = moment().format('YYYY/MM/DD')"
        />
        <q-btn
          flat
          dense
          round
          :color="showCalendar ? 'positive' : ''"
          icon="date_range"
          @click="showCalendar = !showCalendar"
        />
        <q-btn-dropdown
          flat
          dense
          round
          icon="more_vert"
          dropdown-icon=" "
          :disabled="!workout.id"
        >
          <q-list>
            <q-item clickable v-close-popup @click="modalChangeDate = true">
              <q-item-section>
                <q-item-label>Move workout</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="removeWorkout(workout.id)">
              <q-item-section>
                <q-item-label>Remove workout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-btn-group>
    </q-toolbar>
    <q-slide-transition>
      <div class="row text-center ancho" v-show="showCalendar">
        <div class="col-12">
          <q-date
            class="ancho"
            v-model="date"
            :events="workoutDates"
            :years-in-month-view="true"
            minimal
            flat
          />
        </div>
      </div>
    </q-slide-transition>
    <div class="row text-center text-grey" v-if="workout.id">
      <div class="col-12">
        <span>
          {{ summary.exerciseNumber || 0 }} EXS
          {{ summary.setsNumber || 0 }} SETS {{ summary.weightVolume || 0 }} KG
          {{ summary.duration || 0 }} MIN
        </span>
      </div>
    </div>
    <div class="row text-center" v-else>
      <div class="col-12">
        <span> Empty Day </span>
      </div>
    </div>
    <div class="row text-center" v-if="workout.id">
      <div class="col-12">
        <strong v-for="muscle in summary.muscles" :key="muscle">
          {{ muscle.toUpperCase() }}&nbsp;
        </strong>
      </div>
    </div>
    <div class="row items-center" v-if="workout.id">
      <div class="col-12">
        <SetGroupCard
          class="bg-grey-1"
          v-for="setGroup in setGroups"
          :key="setGroup.listOrder"
          :setGroup="setGroup"
          @showSetModal="showSetModal"
          @reloadData="getWorkoutAndSets"
        />
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="workout.id"
        fab
        icon="add"
        color="positive"
        @click="
          $router.push({
            path: '/muscleSupGroups/',
            query: { workoutId: workout.id },
          })
        "
      />
      <q-btn v-else fab color="positive" @click="createWorkout">
        Create Workout
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import moment from "moment";
import {
  defineComponent,
  ref,
  reactive,
  onBeforeMount,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "stores/login-store";
import LeftDrawner from "components/LeftDrawner.vue";
import SetGroupCard from "components/cards/SetGroupCard.vue";
import SetModal from "components/modals/SetModal.vue";
import WorkoutService from "src/services/WorkoutService";
import SetGroupService from "src/services/SetGroupService";
import ChangeWorkoutDateModal from "src/components/modals/ChangeWorkoutDateModal.vue";
export default defineComponent({
  name: "IndexPage",
  components: { LeftDrawner, SetGroupCard, SetModal, ChangeWorkoutDateModal },
  setup() {
    const leftDrawerOpen = ref(false);
    const showCalendar = ref(false);

    const route = useRoute();
    const today = moment().format("YYYY/MM/DD");
    const date = ref(route.query.date ? route.query.date : today);

    const summary = reactive({
      exerciseNumber: 0,
      setsNumber: 0,
      weightVolume: 0,
      duration: 0,
      muscles: [],
    });

    const workoutDates = ref([]);
    const workout = reactive({
      id: null,
      date: moment().format("YYYY/MM/DD"),
      description: null,
    });
    const setGroups = ref([]);

    const useStore = useLoginStore();
    onBeforeMount(() => {
      getWorkoutAndSets();
    });

    watchEffect(() => {
      getWorkoutAndSets(date.value);
    });

    const router = useRouter();
    function getWorkoutAndSets() {
      WorkoutService.getAllDatesFromUser(useStore.getUserId).then((res) => {
        workoutDates.value = res.map((fecha) =>
          moment(fecha).format("YYYY/MM/DD")
        );
      });
      workout.id = null;
      workout.description = null;
      workout.date = moment(date.value).format("YYYY/MM/DD");
      setGroups.value = [];
      for (const key of Object.keys(summary)) summary[key] = null;

      WorkoutService.getAllFromUser(useStore.getUserId).then((res) => {
        const workoutBd = res.find(
          (wo) =>
            wo.date &&
            date.value &&
            moment(wo.date).format("YYYY/MM/DD") === date.value
        );
        if (workoutBd) {
          for (const key of Object.keys(workoutBd))
            workout[key] = workoutBd[key];
        }

        if (workout.id) {
          router.replace({ query: { date: date.value } });
          WorkoutService.getSummaryById(workout.id).then((resSummary) => {
            for (const key of Object.keys(resSummary))
              summary[key] = resSummary[key];
          });
          SetGroupService.getAllWorkoutSetGroups(workout.id).then((resSets) => {
            setGroups.value = resSets;
          });
        }
      });
    }

    const setModalData = reactive({
      setId: null,
      setGroupId: null,
      setsSize: null,
      exerciseId: null,
      visible: false,
    });
    function showSetModal(data) {
      setModalData.setId = data.setId;
      setModalData.setGroupId = data.setGroupId;
      setModalData.setsSize = data.setsSize;
      setModalData.exerciseId = data.exerciseId;
      setModalData.visible = true;
    }

    const modalChangeDate = ref(false);

    async function createWorkout() {
      workout.date = moment(date.value).format("YYYY-MM-DD");
      await WorkoutService.create(useStore.getUserId, workout);
      getWorkoutAndSets();
    }

    async function removeWorkout() {
      if (workout.id) {
        await WorkoutService.delete(workout.id);
        getWorkoutAndSets();
      }
    }

    return {
      showCalendar,
      today,
      date,
      workoutDates,
      leftDrawerOpen,
      summary,
      setGroups,
      showSetModal,
      setModalData,
      workout,
      getWorkoutAndSets,
      moment,
      createWorkout,
      removeWorkout,
      modalChangeDate,
    };
  },
});
</script>

<style scoped>
.ancho {
  width: 100%;
}
</style>
