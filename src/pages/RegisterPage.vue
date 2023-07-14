<template>
  <q-page>
    <div class="bg-black text-white">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back" />
        <q-toolbar-title> NUEVO USUARIO </q-toolbar-title>
      </q-toolbar>
    </div>

    <q-card class="my-card">
      <q-form @submit="login" class="q-gutter-md">
        <q-card-section>
          <q-input filled v-model="state.username" :label="$t('login.username')" autocorrect="off" autocapitalize="off" />
          <q-input filled type="password" v-model="state.password" :label="$t('login.password')" />
          <q-input filled type="email" v-model="state.email" label="Email" autocorrect="off" autocapitalize="off" />

          <q-input filled v-model="state.name" label="Nombre" />
          <q-input filled v-model="state.lastNameFirst" label="Primer apellido" />
          <q-input filled v-model="state.lastNameSecond" label="Segundo apellido" />

          <q-input filled v-model="state.registerCode" label="Codigo de registro" autocorrect="off"
            autocapitalize="off" />
        </q-card-section>

        <q-card-actions>
          <q-btn label="Registrarse" type="submit" color="primary" />
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
import { RegisterResponse } from 'src/types/auth-api/AuthServiceTypes';
export default defineComponent({
  setup() {
    const store = useLoginStore();
    const router = useRouter();

    const state = reactive({
      username: '',
      password: '',
      registerCode: '',
    });

    const $q = useQuasar();
    async function login() {
      const request = {
        username: state.username,
        password: state.password,
        registerCode: state.registerCode
      }
      const res: RegisterResponse | null = await LoginService.singup(request);
      if (res) {
        store.login(res);
        router.back();
      } else {
        $q.notify({
          message:
            'La combinación de usuario y contraseña introducidas no existe',
          color: 'negative',
        });
      }
    }
    return { state, login };
  },
});
</script>
