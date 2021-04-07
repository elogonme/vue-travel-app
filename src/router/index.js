import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    props: true,
    component: Home,
  },
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "DestiantionDetails" */ "../views/DestinationDetails"
      ),
    children: [
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "ExperienceDetails" */ "../views/ExperienceDetails"
          ),
      },
    ],
    beforeEnter: (to, from, next) => {
      const exists = store.destinations.find(
        (destination) => destination.slug === to.params.slug
      );
      if (exists) {
        next();
      } else {
        next({ name: "notFound" });
      }
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "User" */ "../views/User"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login"),
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () =>
      import(/* webpackChunkName: "Login"Invoices */ "../views/Invoices"),
    meta: { requiresAuth: true },
  },
  {
    path: "/404",
    alias: "*",
    name: "notFound",
    props: true,
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound"),
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 150 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }
        return false;
      }
    }
  },
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // if (to.meta.requiresAuth) {
    // need to login
    if (!store.user) {
      next({ name: "login", query: { redirect: to.fullPath } });
    } else next();
  } else {
    next();
  }
});

export default router;
