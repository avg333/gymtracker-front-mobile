import Index from "pages/IndexPage.vue"
import LoginPage from "pages/LoginPage.vue"
import ProgramsPage from "pages/ProgramsPage.vue"
import SessionsPage from "pages/SessionsPage.vue"
import CalculatorPage from "pages/CalculatorPage.vue"
import MuscleSupGroupsPage from "src/pages/MuscleSupGroupsPage.vue"
import MuscleGroupsPage from "src/pages/MuscleGroupsPage.vue"
import MuscleGroupPage from "src/pages/MuscleGroupPage.vue"
import ExercisePage from "pages/ExercisePage.vue"
import CopyWorkout from "src/pages/CopyFromWorkout.vue"


const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "muscleSupGroups", component: MuscleSupGroupsPage },
      { path: "muscleSupGroups/:muscleSupGroupId/muscleGroups", component: MuscleGroupsPage },
      { path: "muscleSupGroups/:muscleSupGroupId/muscleGroups/:muscleGroupId", component: MuscleGroupPage },
      { path: "exercises/:exerciseId", component: ExercisePage },
      { path: "login", component: LoginPage },
      { name: "calculator", path: "calculator", component: CalculatorPage },
      { path: "programs", component: ProgramsPage },
      { path: "programs/:programId/sessions", component: SessionsPage },
      { path: "copyWorkout", component: CopyWorkout },
      { path: "", component: Index },
    ],

  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
