import TasksPage from "@/pages/TasksPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import SummaryPage from "@/pages/SummaryPage.vue";
import NotFoundErrorPage from "@/pages/errors/NotFoundErrorPage.vue";
import Homepage from "@/pages/Homepage.vue";

const routes = [
  {
    path: "/tasks",
    component: TasksPage,
    name: "tasks",
    // meta: {
    //   auth: true,
    // },
  },
  {
    path: "/summary",
    component: SummaryPage,
    name: "summary",
    // meta: {
    //   auth: true,
    // },
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "register",
  },
  {
    path: "/:notFound(.*)",
    component: NotFoundErrorPage,
    name: "error.404",
  },
  {
    path: "/",
    component: Homepage,
    name: "home",
  },
];

export default routes;