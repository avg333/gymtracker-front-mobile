<template>
  <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 100px">
    <div class="absolute-bottom bg-transparent">
      <div class="text-weight-bold">GymTracker v1.0-a</div>
    </div>
  </q-img>

  <q-list>
    <q-item :to="item.to" v-for="item in linksList" :key="item.to">
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section>{{ item.title }}</q-item-section>
    </q-item>
    <q-separator />
    <q-item v-if="isLogged">
      <q-item-section avatar>
        <q-icon name="account_circle" />
      </q-item-section>
      <q-item-section>{{ userName }}</q-item-section>
    </q-item>
    <q-item v-if="isLogged" clickable @click="logout">
      <q-item-section avatar>
        <q-icon name="logout" />
      </q-item-section>
      <q-item-section>Logout</q-item-section>
    </q-item>
    <q-item v-if="!isLogged" clickable @click="login">
      <q-item-section avatar>
        <q-icon name="login" />
      </q-item-section>
      <q-item-section>Login</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useLoginStore } from "stores/login-store";
export default defineComponent({
  name: "IndexPage",
  components: {},
  setup() {
    const linksList = [
      {
        title: "Exercises",
        icon: "fitness_center",
        to: "/muscleSupGroups",
      },
      {
        title: "Programs",
        icon: "menu_book",
        to: "/programs",
      },
      {
        title: "Measurements",
        icon: "scale",
        link: "https://chat.quasar.dev",
      },
      {
        title: "Statistics",
        icon: "show_chart",
        link: "https://forum.quasar.dev",
      },
      {
        title: "Calculator",
        icon: "calculate",
        to: "/calculator",
      },
      {
        title: "Notebook",
        icon: "text_snippet",
        link: "https://facebook.quasar.dev",
      },
      {
        title: "Settings",
        icon: "settings",
        link: "https://awesome.quasar.dev",
      },
    ];

    const store = useLoginStore();
    const isLogged = computed(() => store.getIsLogged);
    const userName = computed(() => store.getLogedUserName);

    function login() {
      store.login("chema", "chema69");
    }

    function logout() {
      store.logout();
    }

    return {
      linksList,
      isLogged,
      userName,
      login,
      logout,
    };
  },
});
</script>
