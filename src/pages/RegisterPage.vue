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
          <q-input
            filled
            v-model="state.username"
            :label="$t('login.username')"
            autocorrect="off"
            autocapitalize="off"
          />
          <q-input
            filled
            type="password"
            v-model="state.password"
            :label="$t('login.password')"
          />
          <q-input
            filled
            type="email"
            v-model="state.email"
            label="Email"
            autocorrect="off"
            autocapitalize="off"
          />

          <q-input filled v-model="state.name" label="Nombre" />
          <q-input
            filled
            v-model="state.lastNameFirst"
            label="Primer apellido"
          />
          <q-input
            filled
            v-model="state.lastNameSecond"
            label="Segundo apellido"
          />

          <q-input
            filled
            v-model="state.registerCode"
            label="Codigo de registro"
            autocorrect="off"
            autocapitalize="off"
          />
        </q-card-section>

        <q-card-actions>
          <q-btn label="Registrarse" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import LoginService from "src/services/LoginService";
import { useLoginStore } from "stores/login-store";
export default {
  setup() {
    const store = useLoginStore();
    const router = useRouter();

    const state = reactive({
      username: "",
      password: "",
      email: "",
      name: "",
      lastNameFirst: "",
      lastNameSecond: "",
      registerCode: "",
    });

    const $q = useQuasar();
    async function login() {
      const res = await LoginService.login(state.username, state.password);
      if (res.ok) {
        store.login(res.data);
        router.back();
      } else if (res.code === 404) {
        $q.notify({
          message: "El usuario introducido no existe",
          color: "negative",
        });
      } else if (res.code === 401) {
        $q.notify({
          message:
            "La combinación de usuario y contraseña introducidas no existe",
          color: "negative",
        });
      } else {
        $q.notify({
          message: "Error al conectar con el servidor",
          color: "negative",
        });
      }
    }
    return { state, login };
  },
};
</script>
