<template>
  <q-img :src="imgLogo" style="height: 100px">
    <div class="absolute-bottom bg-transparent">
      <div class="text-weight-bold text-right fixed-top">v1.0-a</div>
    </div>
  </q-img>

  <q-list>
    <q-item
      :to="item.to"
      v-for="item in linksList"
      :key="item.to"
      :disabled="item.disabled"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section>{{ $t(item.title) }}</q-item-section>
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
      <q-item-section>{{ $t("menu.logout") }}</q-item-section>
    </q-item>
    <q-item v-if="!isLogged" to="login">
      <q-item-section avatar>
        <q-icon name="login" />
      </q-item-section>
      <q-item-section>{{ $t("menu.login") }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import imgLogo from "assets/logo-white.png";
import { computed, defineComponent } from "vue";
import { useLoginStore } from "stores/login-store";
export default defineComponent({
  name: "LeftDrawner",
  components: {},
  setup() {
    const linksList = [
      {
        title: "menu.exercises",
        icon: "fitness_center",
        to: "/muscleSupGroups",
      },
      {
        title: "menu.programs",
        icon: "menu_book",
        to: "/programs",
      },
      {
        title: "menu.measurements",
        icon: "scale",
        disabled: true,
      },
      {
        title: "menu.statistics",
        icon: "show_chart",
        disabled: true,
      },
      {
        title: "menu.calculator",
        icon: "calculate",
        to: "/calculator",
      },
      {
        title: "menu.notes",
        icon: "text_snippet",
        disabled: true,
      },
      {
        title: "menu.settings",
        icon: "settings",
        disabled: true,
      },
    ];

    const store = useLoginStore();
    const isLogged = computed(() => store.getIsLogged);
    const userName = computed(() => store.getLogedUserName);

    function logout() {
      store.logout();
    }

    return {
      linksList,
      isLogged,
      userName,
      logout,
      imgLogo,
    };
  },
});
</script>
