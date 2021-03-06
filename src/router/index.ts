import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Night from "../views/Night.vue";
import Dawn from "../views/Dawn.vue";
import Noon from "../views/Noon.vue";
import Dusk from "../views/Dusk.vue";
import Rule from "../views/Rule.vue";
import Players from "../views/Players.vue";
import Sounds from "../views/Sounds.vue";
import StartGame from "../views/StartGame.vue";
import Continue from "../views/Continue.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/night",
    name: "Night",
    component: Night,
  },
  {
    path: "/dawn",
    name: "Dawn",
    component: Dawn,
  },
  {
    path: "/noon",
    name: "Noon",
    component: Noon,
  },
  {
    path: "/dusk",
    name: "Dusk",
    component: Dusk,
  },
  {
    path: "/rule",
    name: "Rule",
    component: Rule,
  },
  {
    path: "/players",
    name: "Players",
    component: Players,
  },
  {
    path: "/sounds",
    name: "Sounds",
    component: Sounds,
  },
  {
    path: "/startgame",
    name: "StartGame",
    component: StartGame,
  },
  {
    path: "/continue",
    name: "Continue",
    component: Continue,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
