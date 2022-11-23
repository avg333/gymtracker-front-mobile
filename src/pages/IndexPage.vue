<template>
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
      <q-btn flat dense round icon="more_vert" />
    </q-btn-group>
  </q-toolbar>

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
        reloadData();
        setModalData.visible = false;
      "
    />
  </q-dialog>

  <q-page class="bg-grey-4">
    <q-slide-transition>
      <div class="row text-center ancho" v-show="showCalendar">
        <div class="col-12">
          <q-date
            class="ancho"
            v-model="date"
            :events="events"
            :years-in-month-view="true"
            minimal
            flat
          />
        </div>
      </div>
    </q-slide-transition>
    <div class="row text-center text-grey" v-if="workout">
      <div class="col-12">
        <span>
          {{ summary.exNumber }} EXS {{ summary.setsNumber }} SETS
          {{ summary.kg }} KG {{ summary.min }} MIN
        </span>
      </div>
    </div>
    <div class="row text-center" v-else>
      <div class="col-12">
        <span> Empty Day </span>
      </div>
    </div>
    <div class="row text-center" v-if="workout">
      <div class="col-12">
        <span v-for="muscle in summary.muscles" :key="muscle">
          {{ muscle }}&nbsp;
        </span>
      </div>
    </div>
    <div class="row items-center" v-if="workout">
      <div class="col-12">
        <SetGroupCard
          class="bg-grey-1"
          v-for="setGroup in setGroups"
          :key="setGroup.listOrder"
          :setGroup="setGroup"
          @showSetModal="showSetModal"
          @reloadData="reloadData"
        />
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="positive" />
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
export default defineComponent({
  name: "IndexPage",
  components: { LeftDrawner, SetGroupCard, SetModal },
  setup() {
    const leftDrawerOpen = ref(false);

    const route = useRoute();

    const showCalendar = ref(false);
    const today = moment().format("YYYY/MM/DD");
    const date = ref(route.query.date ? route.query.date : today);

    const summary = reactive({
      exNumber: 4,
      setsNumber: 12,
      kg: 13500,
      min: 55,
      muscles: ["Core", "Back", "Legs"],
    });

    const events = ref([]);
    const workout = ref({});
    const setGroups = ref([]);

    const useStore = useLoginStore();
    onBeforeMount(() => {
      WorkoutService.getAllDatesFromUser(useStore.getUserId).then((res) => {
        events.value = res.map((fecha) => moment(fecha).format("YYYY/MM/DD"));
      });
      getWorkoutAndSets(date.value);
    });

    const router = useRouter();
    watchEffect(() => {
      getWorkoutAndSets(date.value);
      //router.replace({ query: { date: date.value } });
    });

    function getWorkoutAndSets(fecha) {
      workout.value = {};
      setGroups.value = [];
      WorkoutService.getAllFromUser(1).then((res) => {
        workout.value = res.find(
          (wo) => moment(wo.date).format("YYYY/MM/DD") === fecha
        );
        if (workout?.value?.id) {
          router.replace({ query: { date: date.value } });
          SetGroupService.getAllWorkoutSetGroups(workout.value.id).then(
            (res2) => {
              setGroups.value = res2;
            }
          );
        }
      });
    }

    function reloadData() {
      getWorkoutAndSets(date.value);
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

    return {
      showCalendar,
      today,
      date,
      events,
      leftDrawerOpen,
      summary,
      setGroups,
      showSetModal,
      setModalData,
      workout,
      reloadData,
      moment,
    };
  },
});
</script>

<style scoped>
.ancho {
  width: 100%;
}
</style>
