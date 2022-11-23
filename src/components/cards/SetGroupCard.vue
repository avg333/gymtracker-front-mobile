<template>
  <div class="row items-center ppal">
    <div class="col-auto">
      <q-btn
        flat
        dense
        round
        size="lg"
        icon="font_download"
        :to="'/exercises/' + setGroup.exerciseId"
      />
    </div>
    <div class="col">
      <div class="row items-center">
        <div class="col-11">
          <strong>{{ setGroup?.exerciseDto?.name }}</strong>
        </div>
        <div class="col-1">
          <q-btn-dropdown flat dense round icon="more_vert">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Replace exercise</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="removeSetGroup(setGroup.id)"
              >
                <q-item-section>
                  <q-item-label>Remove exercise</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
      <div class="row items-center">
        <div class="col-12">
          {{ setGroup.description }}
        </div>
      </div>
      <div class="row items-center">
        <div
          class="col-2"
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
          <div class="row">{{ Math.round(set.weight) }} KG</div>
          <div class="row">{{ Math.round(set.reps) }} REP</div>
          <div class="row">{{ Math.round(set.rir) }} RIR</div>
        </div>
        <div class="col-2">
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
import SetGroupService from "src/services/SetGroupService";
export default {
  props: { setGroup: Object },
  emits: ["showSetModal", "reloadData"],
  setup(_, { emit }) {
    async function removeSetGroup(setGroupId) {
      await SetGroupService.delete(setGroupId);
      emit("reloadData");
    }
    return { removeSetGroup };
  },
};
</script>
<style scoped>
.ppal {
  border-radius: 7px !important;
  margin: 7px;
}
</style>
