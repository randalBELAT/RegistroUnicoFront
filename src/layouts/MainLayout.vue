<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <q-avatar square style="width: 160px; height: 90px">
            <img src="https://plataforma.bancaeticalat.com/logo_web.svg" />
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  setup() {
    return {
      onClick() {
        // console.log('Clicked on a fab action')
      },
    };
  },
};
</script>
