import { createWebHistory, createRouter } from "vue-router";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import HomePage from "../components/HomePage";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
