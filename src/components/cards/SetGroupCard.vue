<template>
  <div class="row items-center ppal">
    <div class="col-auto">
      <q-btn flat dense round :to="'/exercises/' + setGroup.exerciseId">
        <q-icon size="lg">
          <img
            :src="getMuscleGroupIco(setGroup.exerciseDto.muscleGroups[0])"
            alt="?"
          />
        </q-icon>
      </q-btn>
    </div>

    <div class="col">
      <div class="row items-center">
        <div class="col-10">
          <strong>{{ setGroup?.exerciseDto?.name.toUpperCase() }}</strong>
        </div>

        <div class="col-2 text-right">
          <q-btn flat dense round icon="more_vert">
            <q-menu>
              <q-list>
                <q-item v-close-popup clickable>
                  <q-item-section>
                    <q-item-label
                      @click="
                        $router.push({
                          path: '/muscleSupGroups/',
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

      <div class="row items-center">
        <div class="col-12">
          {{ setGroup.description }}
        </div>
      </div>

      <div class="row items-center text-center">
        <div
          class="col-auto bg-grey-4 scndary"
          :class="Math.round(set.rir) > 3 && 'text-grey'"
          v-for="set in setGroup.setDtoList"
          :key="set.listOrder"
          @click="
            $emit('showSetModal', {
              setId: set.id,
              setGroupId: setGroup.id,
              setsSize: setGroup.setDtoList.length,
              exerciseId: setGroup.exerciseId,
            })
          "
        >
          <div class="row">
            <div class="col-12">
              {{ Math.round(set.weight) }}
              {{ $t("card.set.kg") }}
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              {{ Math.round(set.reps) }}
              {{ $t("card.set.rep") }}
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              {{ Math.round(set.rir) }}
              {{ $t("card.set.rir") }}
            </div>
          </div>
        </div>
        <div class="col-auto">
          <q-btn
            class="text-grey"
            flat
            dense
            round
            icon="add"
            @click="
              $emit('showSetModal', {
                setId: null,
                setGroupId: setGroup.id,
                setsSize: setGroup.setDtoList.length,
                exerciseId: setGroup.exerciseId,
              })
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMuscleGroupIco } from "src/utils/icoUtils";
import SetGroupService from "src/services/SetGroupService";
export default {
  props: { setGroup: Object },
  emits: ["showSetModal", "reloadData"],
  setup(_, { emit }) {
    async function removeSetGroup(setGroupId) {
      await SetGroupService.delete(setGroupId);
      emit("reloadData");
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
