<template>
  <div
    class="row items-center ppal"
    :class="exerciseId && exerciseId === setGroup.exercise.id && 'text-primary'"
  >
    <div class="col-auto">
      <q-btn flat dense round :to="'/exercises/' + setGroup.exercise.id">
        <q-icon
          size="lg"
          v-if="setGroup?.exercise?.muscleGroupExercises?.length"
        >
          <img
            :src="
              getMuscleGroupIco(
                setGroup.exercise.muscleGroupExercises[0].muscleGroup
              )
            "
            alt="?"
          />
        </q-icon>
      </q-btn>
    </div>

    <div class="col">
      <div class="row items-center">
        <div class="col-10">
          <strong>{{ setGroup?.exercise?.name?.toUpperCase() }}</strong>
        </div>

        <div class="col-2 text-right">
          <q-btn flat dense round icon="more_vert" v-if="!onlyRead">
            <q-menu>
              <q-list>
                <q-item v-close-popup clickable>
                  <q-item-section>
                    <q-item-label
                      @click="
                        $emit('showHistoricoModal', {
                          setGroupId: setGroup.id,
                          exerciseId: setGroup.exercise.id,
                        })
                      "
                    >
                      {{ $t("card.set.historic") }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-close-popup clickable>
                  <q-item-section>
                    <q-item-label
                      @click="
                        $router.push({
                          path: '/exercises/',
                          query: { setGroupId: setGroup.id },
                        })
                      "
                    >
                      {{ $t("card.set.replaceExercise") }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  v-close-popup
                  clickable
                  @click="removeSetGroup(setGroup.id)"
                >
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
        <div
          class="col-auto bg-grey-4 scndary"
          :class="Math.round(set.rir) > 3 && 'text-grey'"
          v-for="set in setGroup.sets"
          :key="set.id"
          @click="
            $emit('showSetModal', {
              setId: set.id,
              setGroupId: setGroup.id,
              setsSize: setGroup.sets.length,
              exerciseId: setGroup.exercise.id,
            })
          "
        >
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
          <q-btn
            v-if="!onlyRead"
            class="text-grey"
            flat
            dense
            round
            icon="add"
            @click="
              $emit('showSetModal', {
                setId: null,
                setGroupId: setGroup.id,
                setsSize: setGroup.sets.length,
                exerciseId: setGroup.exercise.id,
              })
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//READY
import SetGroupService from "src/services/SetGroupService";
import { getMuscleGroupIco } from "src/utils/icoUtils";
export default {
  name: "SetGroupCard",
  props: { setGroup: Object, onlyRead: Boolean, exerciseId: Number },
  emits: ["showSetModal", "showHistoricoModal", "updateSets"],
  setup(_, { emit }) {
    async function removeSetGroup(setGroupId) {
      await SetGroupService.delete(setGroupId);
      emit("updateSets");
    }
    return { removeSetGroup, getMuscleGroupIco };
  },
};
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
