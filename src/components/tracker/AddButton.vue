<template>
  <q-btn v-if="workoutId" fab icon="add" color="positive">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section
            @click="
              $router.push({
                name: 'exercises',
                query: { workoutId },
              })
            "
          >
            {{ $t("addButton.exercise") }}
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section @click="$emit('showModalWorkouts')">
            {{ $t("addButton.calendar") }}
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            {{ $t("addButton.programs") }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>

  <q-btn v-else fab color="positive" @click="$emit('createWorkout')">
    {{ $t("tracker.create") }}
  </q-btn>
</template>

<script>
//READY!
export default {
  name: "AddButon",
  emits: ["createWorkout", "showModalWorkouts"],
  props: { workoutId: { type: Number } },
};
</script>
