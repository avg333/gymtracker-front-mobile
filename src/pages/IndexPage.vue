<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <LeftDrawner />
  </q-drawer>

  <q-dialog v-model="modalChangeDate">
    <ChangeWorkoutDateModal
      :workoutId="workout.id"
      @closeModal="
        getWorkouts();
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
      <q-chip v-if="today === date" square class="text-white" color="positive">
        <strong> {{ $t("tracker.today") }} </strong>
      </q-chip>
      <span v-else>
        <strong>
          {{ moment(date).format("DD MMM") }}
        </strong>
      </span>
      <q-space />
      <q-btn-group flat>
        <q-btn
          flat
          dense
          round
          icon="today"
          :disabled="today == date"
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
        <q-btn
          flat
          dense
          round
          icon="more_vert"
          :disabled="!workout.id || !isLogged"
        >
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup @click="modalChangeDate = true">
                <q-item-section>
                  <q-item-label>{{ $t("tracker.moveWorkout") }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="removeWorkout(workout.id)"
              >
                <q-item-section>
                  <q-item-label>{{ $t("tracker.deleteWorkout") }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
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

    <SetGroupsContainer
      v-if="isLogged"
      :workout="workout"
      :showSummary="true"
    />

    <div v-else class="flex flex-center text-center q-pa-md">
      <div>
        <span> {{ $t("tracker.notLogged") }} </span>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="isLogged">
      <AddButton v-if="workout.id" :workoutId="workout.id" :date="date" />
      <q-btn v-else fab color="positive" @click="createWorkout">
        {{ $t("tracker.create") }}
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import moment from "moment";
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onBeforeMount,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "stores/login-store";
import LeftDrawner from "components/LeftDrawner.vue";
import ChangeWorkoutDateModal from "components/modals/ChangeWorkoutDateModal.vue";
import WorkoutService from "src/services/WorkoutService";
import AddButton from "src/components/tracker/addButton.vue";
import SetGroupsContainer from "src/components/tracker/SetGroupsContainer.vue";
export default defineComponent({
  name: "IndexPage",
  components: {
    LeftDrawner,
    ChangeWorkoutDateModal,
    AddButton,
    SetGroupsContainer,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const useStore = useLoginStore();
    const isLogged = computed(() => useStore.getIsLogged);

    const leftDrawerOpen = ref(false);
    const showCalendar = ref(false);
    const modalChangeDate = ref(false);

    const today = moment().format("YYYY/MM/DD");
    const date = ref(route.query.date ? route.query.date : today);

    const workoutDates = ref([]);
    const workout = reactive({ date: moment().format("YYYY/MM/DD") });

    onBeforeMount(() => {
      getWorkouts();
    });

    watchEffect(() => {
      date.value;
      getWorkouts();
    });

    function getWorkouts() {
      if (!isLogged.value) return;

      WorkoutService.getAllFromUser(useStore.getUserId).then((res) => {
        workoutDates.value = res.map((wo) =>
          moment(wo.date).format("YYYY/MM/DD")
        );
        const workoutBd = res.find(
          (wo) =>
            wo.date &&
            date.value &&
            moment(wo.date).format("YYYY/MM/DD") === date.value
        );
        if (workoutBd) {
          for (const key of Object.keys(workoutBd))
            workout[key] = workoutBd[key];
        } else {
          workout.id = null;
          workout.description = null;
          workout.date = moment(date.value).format("YYYY/MM/DD");
        }
        router.replace({ query: { date: date.value } });
      });
    }

    async function createWorkout() {
      workout.date = moment(date.value).format("YYYY-MM-DD");
      await WorkoutService.create(useStore.getUserId, workout);
      getWorkouts();
    }

    const $q = useQuasar();
    async function removeWorkout() {
      $q.dialog({
        title: "¿Delete Workout?",
        message: "This action can not be undone",
        cancel: true,
        ok: {
          push: true,
          label: "Delete",
          color: "negative",
        },
      }).onOk(async () => {
        if (workout.id) {
          await WorkoutService.delete(workout.id);
          getWorkouts();
        }
      });
    }

    return {
      showCalendar,
      today,
      date,
      workoutDates,
      leftDrawerOpen,
      workout,
      getWorkouts,
      moment,
      createWorkout,
      removeWorkout,
      modalChangeDate,
      isLogged,
    };
  },
});
</script>

<style scoped>
.ancho {
  width: 100%;
}
</style>
