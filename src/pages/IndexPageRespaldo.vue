<template>
  <q-page padding>
    <div class="row justify-center q-ma-md">
      <h2 class="q-mx-xl home-title text-center" style="font-family: Raleway">
        {{ $t("welcomeTitle1") }}
        <span class="primary">{{ $t("welcomeTitle2") }}</span>
      </h2>
    </div>
    <div class="row justify-center q-ma-md">
      <p
        class="q-mx-xl home-subtitle col-6 text-center"
        style="font-family: Raleway"
      >
        {{ $t("welcome1") }}
      </p>
    </div>
    <div class="row justify-center q-ma-md">
      <p
        class="q-mx-xl home-subtitle col-6 text-center"
        style="font-family: Raleway"
      >
        <strong>{{ $t("langSelection") }}</strong>
      </p>
    </div>
    <div class="row justify-center q-gutter-sm">
      <div class="col-3 col-xs-12 col-sm-12 col-md-3 q-gutter-sm text-center">
        <q-btn
          outline
          rounded
          @click="step = 6"
          color="secondary"
          label="ESPAÑOL"
          class="btn q-ml-sm"
        />
      </div>
      <div class="col-3 col-xs-12 col-sm-12 col-md-3 q-gutter-sm text-center">
        <q-btn
          outline
          rounded
          @click="step = 6"
          color="secondary"
          label="PORTUGUES"
          class="btn q-ml-sm"
        />
      </div>
      <div class="col-3 col-xs-12 col-sm-12 col-md-3 q-gutter-sm text-center">
        <q-btn
          outline
          rounded
          @click="step = 6"
          color="secondary"
          label="ENGLISH"
          class="btn q-ml-sm"
        />
      </div>
    </div>
    <div class="row justify-center q-ma-md q-pt-md">
      <p
        class="q-mx-xl home-subtitle col-6 text-center"
        style="font-family: Raleway"
      >
        {{ $t("welcome2") }}
      </p>
    </div>
    <div class="row justify-center q-ma-md q-pt-sm">
      <q-btn
        color="secondary"
        :label="$t('continue')"
        rounded
        icon-right="ti-angle-right"
        to="/BasicInfo"
        class="btn"
      ></q-btn>
    </div>
  </q-page>
</template>

<script></script>
