<template>
  <q-page>
    <div class="row justify-center">
      <h2 class="home-title text-center" style="font-family: Raleway">
        {{ $t("registerDoneTitle1") }}
        <span class="primary">{{ $t("registerDoneTitle2") }}</span>
      </h2>
    </div>
    <div class="row justify-center q-ma-md">
      <p
        class="q-mx-xl home-subtitle col-6 text-center"
        style="font-family: Raleway"
      >
        {{ $t("registerDone1") }}
      </p>
    </div>
    <div class="row justify-center q-ma-md q-pt-xl">
      <p
        class="q-mx-xl home-subtitle col-6 text-center"
        style="font-family: Raleway"
      >
        {{ $t("registerDone2") }}
      </p>
    </div>
    <div class="row justify-center q-ma-mdl">
      <p
        class="q-mx-xl home-subtitle col-6 text-center"
        style="font-family: Raleway"
      >
        {{ $t("registerDone3") }}
      </p>
    </div>
    <div class="row justify-center q-ma-md q-pt-xl">
      <div class="col-2">
        <q-btn
          outline
          rounded
          @click="step = 6"
          color="secondary"
          :label="$t('exit')"
          class="btn"
          icon="ti-angle-left"
        ></q-btn>
      </div>
      <div class="col-2">
        <q-btn
          color="secondary"
          :label="$t('platformRedirection')"
          rounded
          icon-right="ti-angle-right"
          href="https://plataforma.test.bancaeticalat.com/"
          class="btn"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
/* import { api } from "src/boot/axios";
  import { ref } from "vue";
  
  export default {
    setup() {
      return {
        step: ref(1),
        model: ref(null),
        countries: ["CHILE", "BRASIL", "ARGENTINA", "URUGUAY", "OTRO"],
        personType: ["NATURAL", "JURIDICA"],
        communicationChannel: ["EMAIL", "TELEFONO", "WHATSAPP"],
      };
    },
  }; */

/* const token = ref("");
  const expiresIn = ref("");
  
  const access = async () => {
    try {
      const res = await api.post("/login", {
        email: "randal@hola.com",
        password: "1234",
      });
  
      console.log(res.data);
  
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
    } catch (error) {
      console.log(error);
    }
  }; */

/* const refreshToken = async () => {
    try {
      const res = await api.get("/refresh");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  refreshToken(); */
</script>
