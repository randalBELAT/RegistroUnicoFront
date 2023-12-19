<template>
  <q-layout view="hHh lpR fFf">
    <!--     <q-header class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <div class="row">
            <div class="col-5 fondo_azul"></div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
 -->
    <q-page-container>
      <div class="container">
        <div class="row">
          <div
            class="col-5 col-xs-12 col-sm-12 col-md-5 fondo_azul q-pt-lg q-pb-xl"
          >
            <div class="text-center">
              <q-avatar square style="width: 160px; height: 90px">
                <img src="../assets/logo_be_blanco.svg" />
              </q-avatar>
            </div>
            <div
              :class="{
                'q-mx-xl q-pt-sm text-center': $q.platform.is.mobile,
                'q-mx-xl q-pt-xl text-center': $q.platform.is.desktop,
              }"
            >
              <h2 class="home-title" style="font-family: Raleway; color: white">
                {{ $t("welcomeTitle1") }}
                <span>{{ $t("welcomeTitle2") }}</span>
              </h2>
            </div>
            <p
              class="q-mx-xl home-subtitle col-6 text-center"
              style="font-family: Raleway; color: white"
            >
              {{ $t("welcome1") }}
            </p>
          </div>
          <div class="col-7 col-xs-12 col-sm-12 col-md-7">
            <router-view />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.fondo_azul {
  background-image: url("../assets/fondo_azul.png");
}
</style>
