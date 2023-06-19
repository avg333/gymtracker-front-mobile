<template>
  <q-toolbar class="bg-black text-white">
    <q-btn flat dense round icon="menu" aria-label="Menu" @click="$emit('showHideLeftDrawer')" />
    <q-chip v-if="today === date" square class="text-white" color="positive">
      <strong> {{ $t("tracker.today") }} </strong>
    </q-chip>
    <strong v-else>
      {{ dateToDayMonth(date) }}
    </strong>
    <q-space />
    <q-btn-group flat>
      <q-btn flat dense round icon="today" :disabled="today === date" @click="$emit('setToday')" />
      <q-btn flat dense round :color="calendarActive ? 'positive' : ''" icon="date_range" :disabled="!isLogged"
        @click="$emit('showHideCalendar')" />
      <q-btn flat dense round icon="more_vert" :disabled="!workoutId || !isLogged">
        <q-menu>
          <q-list>
            <q-item clickable v-close-popup @click="$emit('showModalChangeDate')">
              <q-item-section>
                <q-item-label>{{ $t("tracker.moveWorkout") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="$emit('showRemoveWorkoutModal')">
              <q-item-section>
                <q-item-label>{{ $t("tracker.deleteWorkout") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-btn-group>
  </q-toolbar>
</template>

<script>
//READY!
import { dateToISO8601, dateToDayMonth } from 'src/utils/dateFormater';
export default {
  name: 'TrackerToolbar',
  emits: [
    'showHideLeftDrawer',
    'setToday',
    'showHideCalendar',
    'showRemoveWorkoutModal',
    'showModalChangeDate',
  ],
  props: {
    date: String,
    isLogged: Boolean,
    calendarActive: Boolean,
    workoutId: String,
  },
  setup() {
    const today = dateToISO8601();
    return { today, dateToDayMonth };
  },
};
</script>
