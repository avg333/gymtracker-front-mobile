<template>
  <q-toolbar class="bg-black text-white">
    <q-btn flat dense round icon="arrow_back" @click="$router.back" />
    <q-toolbar-title> {{ program.name }} </q-toolbar-title>
    <q-btn-group flat>
      <q-btn flat dense round icon="info" />
      <q-btn flat dense round icon="add" />
    </q-btn-group>
  </q-toolbar>
  <q-page>
    <SessionCard
      v-for="session in sessions"
      :key="session.id"
      :session="session"
    />
  </q-page>
</template>

<script>
import { ref, reactive, defineComponent, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import SessionCard from "components/cards/SessionCard.vue";
import ProgramService from "src/services/ProgramService";
import SessionService from "src/services/SessionService";

export default defineComponent({
  name: "IndexPage",
  components: { SessionCard },
  setup() {
    const program = reactive({});
    const sessions = ref([]);

    const route = useRoute();
    const programId = route.params.programId;
    onBeforeMount(async () => {
      ProgramService.getById(programId).then((res) => {
        for (const key of Object.keys(res)) program[key] = res[key];
      });
      SessionService.getAllProgramSessions(programId).then((res) => {
        sessions.value = res;
      });
    });

    return { program, sessions, programId };
  },
});
</script>
