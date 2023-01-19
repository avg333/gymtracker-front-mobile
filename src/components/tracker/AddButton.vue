<template>
  <q-btn v-if="workoutId" fab icon="add" color="positive">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section
            @click="
              $router.push({
                path: '/muscleSupGroups/',
                query: { workoutId },
              })
            "
            >From exercises
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section @click="$emit('showModalWorkouts', workoutId)">
            From calendar
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>From program</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>

  <q-btn v-else fab color="positive" @click="$emit('createWorkout')">
    {{ $t("tracker.create") }}
  </q-btn>
</template>

<script>
export default {
  props: { workoutId: Number, date: String },
  emits: ["createWorkout"],
};
</script>
