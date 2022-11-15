import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import MeetingComponent from "@/components/MeetingComponent.vue";
import ReportComponent from "@/components/ReportComponent.vue";
import MeetingItemsComponent from "@/components/MeetingItemsComponent.vue";
import ItemStatusComponent from "@/components/ItemStatusComponent.vue";
import MeetingTypeComponent from "@/components/MeetingTypeComponent.vue";
import DashBoard from "@/components/DashBoard.vue";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    component: DashBoard,
  },
  {
    path: "/",
    component: DashBoard,
  },
  {
    path: "/meeting",
    component: MeetingComponent,
  },
  {
    path: "/meeting-type",
    component: MeetingTypeComponent,
  },
  {
    path: "/item-status",
    component: ItemStatusComponent,
  },
  {
    path: "/reports",
    component: ReportComponent,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: () => import("./components/auth/Profile.vue"),
  },
  {
    path: "/login",
    component: Login,
  },

  {
    path: "/register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
