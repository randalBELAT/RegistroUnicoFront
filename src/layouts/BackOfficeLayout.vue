<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-primary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title class="text-center">
          <q-avatar square style="width: 160px; height: 90px">
            <img src="https://plataforma.bancaeticalat.com/logo_web.svg" />
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              :active="activeRoute === menuItem.route"
              v-ripple
              @click="navigateTo(menuItem.route)"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref, computed } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const menuList = [
  {
    icon: "inbox",
    label: "Visualizar Registros",
    route: "/BackOffice/PersonViewer",
    separator: true,
  },
  {
    icon: "upload",
    label: "Carga Masiva",
    route: "/BackOffice/LoadData",
    separator: false,
  },
];

const routes = [
  {
    path: "/",
    component: () => import("layouts/LayoutIndex.vue"),
    children: [
      { path: "", component: () => import("src/pages/IndexPage.vue") },
    ],
  },
  {
    path: "/BackOffice",
    component: () => import("layouts/LayoutIndex.vue"),
    children: [
      { path: "", component: () => import("src/pages/BackofficeIndex.vue") },
    ],
  },
  {
    path: "/BackOffice/LoadData",
    component: () => import("layouts/BackOfficeLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/LoadData.vue") }],
  },
  {
    path: "/LoginPage",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },

  {
    path: "/BasicInfo",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/BasicInfo.vue") }],
  },

  {
    path: "/RegisterDone",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/RegisterDone.vue") }],
  },

  {
    path: "/BackOffice/PersonViewer",
    component: () => import("layouts/BackOfficeLayout.vue"),
    children: [{ path: "", component: () => import("pages/PersonViewer.vue") }],
  },

  {
    path: "/Idioma",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IdiomasTest.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default {
  setup() {
    const drawer = ref(false);
    const activeRoute = ref("/inbox");

    function navigateTo(route) {
      activeRoute.value = route;
      router.push(route);
      window.location.href = "http://localhost:9000" + route;
    }

    return {
      drawer,
      menuList,
      activeRoute,
      navigateTo,
    };
  },
};
</script>
