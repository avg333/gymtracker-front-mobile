import Index from "pages/IndexPage.vue"
import LoginPage from "pages/LoginPage.vue"
import ProgramsPage from "pages/ProgramsPage.vue"
import SessionsPage from "pages/SessionsPage.vue"
import CalculatorPage from "pages/CalculatorPage.vue"
import ExercisePage from "pages/ExercisePage.vue"


const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "exercises/:exerciseId", component: ExercisePage },
      { path: "login", component: LoginPage },
      { path: "calculator", component: CalculatorPage },
      { path: "programs", component: ProgramsPage },
      { path: "programs/:programId/sessions", component: SessionsPage },
      { path: "", component: Index },
    ],

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
