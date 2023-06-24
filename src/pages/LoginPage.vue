<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title>
          {{ $t("login.title") }}
        </q-toolbar-title>
      </q-toolbar>
    </div>

    <q-card class="my-card">
      <q-form @submit="login" class="q-gutter-md">
        <q-card-section>
          <q-input filled v-model="state.username" :label="$t('login.username')" autocorrect="off" autocapitalize="off" />

          <q-input filled type="password" v-model="state.password" :label="$t('login.password')" />
        </q-card-section>

        <q-card-actions>
          <q-btn :label="$t('login.login')" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { reactive, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import LoginService from 'src/services/auth-api/LoginService';
import { useLoginStore } from 'stores/login-store';
export default defineComponent({
  setup() {
    const store = useLoginStore();
    const router = useRouter();

    const state = reactive({
      username: '',
      password: '',
    });

    const $q = useQuasar();
    async function login() {
      const res: any = await LoginService.login(state.username, state.password);
      if (res.ok) {
        store.login(res.data);
        router.back();
      } else if (res.code === 404) {
        $q.notify({
          message: 'El usuario introducido no existe',
          color: 'negative',
        });
      } else if (res.code === 401) {
        $q.notify({
          message:
            'La combinación de usuario y contraseña introducidas no existe',
          color: 'negative',
        });
      } else {
        $q.notify({
          message: 'Error al conectar con el servidor',
          color: 'negative',
        });
      }
    }
    return { state, login };
  },
});
</script>
