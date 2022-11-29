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
    <div class="row">
      <div class="col-12">
        <q-card class="my-card">
          <q-form @submit="login" class="q-gutter-md">
            <q-card-section>
              <q-input
                filled
                v-model="username"
                :label="$t('login.username')"
              />

              <q-input
                filled
                type="password"
                v-model="password"
                :label="$t('login.password')"
              />
            </q-card-section>
            <q-card-actions>
              <q-btn :label="$t('login.login')" type="submit" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "stores/login-store";
export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const store = useLoginStore();
    const router = useRouter();
    async function login() {
      const res = await store.login(username.value, password.value);
      if (res) {
        router.back();
      } else {
        console.log("Error al logear");
      }
    }
    return { username, password, login };
  },
};
</script>
<style></style>
