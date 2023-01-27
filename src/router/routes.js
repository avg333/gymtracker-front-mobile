import Index from "pages/IndexPage.vue"
import LoginPage from "pages/LoginPage.vue"
import RegisterPage from "pages/RegisterPage.vue"
import ProgramsPage from "pages/ProgramsPage.vue"
import SessionsPage from "pages/SessionsPage.vue"
import CalculatorPage from "pages/CalculatorPage.vue"
import MuscleSupGroupsPage from "src/pages/MuscleSupGroupsPage.vue"
import MuscleGroupsPage from "src/pages/MuscleGroupsPage.vue"
import MuscleGroupPage from "src/pages/MuscleGroupPage.vue"
import ExercisePage from "pages/ExercisePage.vue"
import ExercisesPage from "pages/ExercisesPage.vue"


const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "exercises/", component: ExercisesPage },
      { path: "exercises/:exerciseId", component: ExercisePage },
      { path: "login", component: LoginPage },
      { path: "register", component: RegisterPage },
      { name: "calculator", path: "calculator", component: CalculatorPage },
      { path: "programs", component: ProgramsPage },
      { path: "programs/:programId/sessions", component: SessionsPage },
      { path: "", component: Index },
    ],

  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
