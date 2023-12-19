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

export default routes;
