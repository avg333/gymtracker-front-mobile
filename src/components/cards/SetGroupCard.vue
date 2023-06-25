<template>
  <div class="row items-center ppal" :class="exerciseId && exerciseId === setGroup.exercise.id && 'text-primary'">
    <div class="col-auto">
      <q-btn flat dense round :to="'/exercises/' + setGroup.exercise.id">
        <q-icon size="lg">
          <!-- TODO Añadir imagen ejericio-->
        </q-icon>
      </q-btn>
    </div>

    <div class="col">
      <div class="row items-center">
        <div class="col-10">
          <strong>{{ setGroup.exercise.name.toUpperCase() }}</strong>
        </div>

        <div class="col-2 text-right">
          <q-btn flat dense round icon="more_vert" v-if="!onlyRead">
            <q-menu>
              <q-list>
                <q-item v-close-popup clickable>
                  <q-item-section>
                    <q-item-label @click="openHistoricoModal()">
                      {{ $t("card.set.historic") }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-close-popup clickable>
                  <q-item-section>
                    <q-item-label @click="
                      $router.push({
                        path: '/exercises/',
                        query: { setGroupId: setGroup.id },
                      })
                      ">
                      {{ $t("card.set.replaceExercise") }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-close-popup clickable @click="removeSetGroup()">
                  <q-item-section>
                    <q-item-label>
                      {{ $t("card.set.removeExercise") }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>

      <div class="items-center">
        {{ setGroup.description }}
      </div>

      <div class="row items-center text-center">
        <div class="col-auto bg-grey-4 scndary" :class="Math.round(set.rir) > efectiveRir && 'text-grey'"
          v-for="set in setGroup.sets" :key="set.id" @click="openModalEditSet(set.id)">
          <div>
            {{ Math.round(set.weight) }}
            {{ $t("card.set.kg") }}
          </div>
          <div>
            {{ Math.round(set.reps) }}
            {{ $t("card.set.rep") }}
          </div>
          <div>
            {{ Math.round(set.rir) }}
            {{ $t("card.set.rir") }}
          </div>
        </div>
        <div class="col-auto">
          <q-btn v-if="!onlyRead" class="text-grey" flat dense round icon="add" @click="openModalNewSet()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const efectiveRir = 3;
import { PropType } from 'vue'
import SetGroupService from 'src/services/workouts-api/SetGroupService';
import { GetWorkoutResponseSetGroups } from 'src/types/workouts-api/WorkoutServiceTypes';
import { ShowSetModal } from '../tracker/SetGroupsContainer.vue';
import { ShowHistoricoModal } from 'src/pages/IndexPage.vue';
const props = defineProps({
  setGroup: { type: Object as PropType<GetWorkoutResponseSetGroups>, required: true },
  onlyRead: { type: Boolean, required: false },
  exerciseId: { type: String, required: false }
})
const emit = defineEmits<{
  updateSets: []
  showSetModal: [data: ShowSetModal]
  showHistoricoModal: [data: ShowHistoricoModal]
}>()
function openHistoricoModal() {
  emit('showHistoricoModal', {
    setGroupId: props.setGroup.id,
    exerciseId: props.setGroup.exercise.id,
  })
}
function openModalNewSet() {
  emit('showSetModal', {
    setId: null,
    setGroupId: props.setGroup.id,
    setsSize: props.setGroup.sets.length,
    exerciseId: props.setGroup.exercise.id,
  })
}
function openModalEditSet(setId: string) {
  emit('showSetModal', {
    setId: setId,
    setGroupId: props.setGroup.id,
    setsSize: props.setGroup.sets.length,
    exerciseId: props.setGroup.exercise.id,
  })
}
async function removeSetGroup() {
  const deleteOk = await SetGroupService.delete(props.setGroup.id);
  if (deleteOk) {
    emit('updateSets');
  } else {
    console.error(`No se puede eliminar el setGroup: ${props.setGroup.id}`)
  }
}
</script>

<style scoped>
.ppal {
  border-radius: 7px !important;
  margin: 7px;
}

.scndary {
  border-radius: 3px !important;
  margin: 2px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
