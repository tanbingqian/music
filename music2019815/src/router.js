import Vue from "vue";
import Router from "vue-router";

import Recommend from "./components/recommend/recommend.vue";
import Rand from "./components/rank/rank.vue";
import Search from "./components/search/search.vue";
import Singer from "./components/singer/singer.vue";
import Tab from "./components/tab/tab.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "recommend"
    },
    {
      path: "/recommend",
      name: "recommend",
      component: Recommend
    },
    {
      path: "/rank",
      name: "rank",
      component: Rand
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/singer",
      name: "singer",
      component: Singer
    },
    {
      path: "/tab",
      name: "tab",
      component: Tab
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
