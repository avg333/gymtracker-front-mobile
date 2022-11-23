<template>
  <q-toolbar class="bg-black text-white">
    <q-btn flat dense round icon="arrow_back" @click="$router.back" />
    <q-toolbar-title> Programs </q-toolbar-title>
    <q-space />
    <q-btn-group flat>
      <q-btn flat dense round icon="add" />
    </q-btn-group>
  </q-toolbar>
  <q-page>
    <ProgramCard
      v-for="program in programs"
      :key="program.id"
      :program="program"
      @click="$router.push('/programs/' + program.id + '/sessions')"
    />
  </q-page>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import { useLoginStore } from "stores/login-store";
import ProgramCard from "src/components/cards/ProgramCard.vue";
import ProgramService from "src/services/ProgramService";

export default defineComponent({
  name: "IndexPage",
  components: { ProgramCard },
  setup() {
    const programs = ref([]);
    const useStore = useLoginStore();
    onBeforeMount(async () => {
      const total = await ProgramService.countAll(useStore.getUserId);

      ProgramService.getAll(useStore.getUserId, 0, total).then((res) => {
        programs.value = res;
      });
    });
    return { programs };
  },
});
</script>
