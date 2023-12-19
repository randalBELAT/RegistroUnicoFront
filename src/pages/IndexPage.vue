<template>
  <q-page padding>
    <div
      :class="{
        'row justify-center q-ma-md': $q.platform.is.mobile,
        'row justify-center q-ma-md q-pt-xl q-mt-xl': $q.platform.is.desktop,
      }"
    >
      <div
        :class="{
          'col-12 col-xs-12 col-sm-12 col-md-12': $q.platform.is.mobile,
          'col-12 col-xs-12 col-sm-12 col-md-12 q-mt-xl q-pt-xl':
            $q.platform.is.desktop,
        }"
      >
        <div class="container" v-show="mostrarDivPaises">
          <div
            :class="{
              '': $q.platform.is.mobile,
              'q-mt-md q-pt-md': $q.platform.is.desktop,
            }"
          >
            <p
              class="q-mx-xl q-pt-xl home-subtitle text-center"
              style="font-family: Raleway"
            >
              <strong>{{ $t("langSelection") }}</strong>
            </p>
          </div>
          <div class="row justify-center">
            <div class="q-pt-md col-2 col-xs-12 col-sm-12 col-md-2 text-center">
              <q-btn
                v-bind="buttonPropsEs"
                color="secondary"
                label="ESPAÑOL"
                class="btn-xs q-ml-sm"
                size="md"
                @click="changeLanguageEs('es-es')"
              />
            </div>
            <div class="q-pt-md col-2 col-xs-12 col-sm-12 col-md-2 text-center">
              <q-btn
                v-bind="buttonPropsBr"
                color="secondary"
                label="PORTUGUES"
                class="btn-xs q-ml-sm"
                size="md"
                @click="changeLanguageBr('br-br')"
              />
            </div>
            <div class="q-pt-md col-2 col-xs-12 col-sm-12 col-md-2 text-center">
              <q-btn
                v-bind="buttonPropsEn"
                color="secondary"
                label="ENGLISH"
                class="btn-xs q-ml-sm"
                @click="changeLanguageEn('en-US')"
              />
            </div>
          </div>

          <div
            :class="{
              'row q-pt-sm q-mt-xl justify-center': $q.platform.is.mobile,
              'row q-pt-xl q-mt-xl justify-center': $q.platform.is.desktop,
            }"
          >
            <div
              :class="{
                'col-3 q-pt-sm q-mt-sm': $q.platform.is.mobile,
                'col-3 q-pt-lg q-mt-lg': $q.platform.is.desktop,
              }"
            >
              <q-btn
                outline
                color="secondary"
                :label="$t('login')"
                class="btn-xs"
                @click="OcultarDivPaises"
              />
            </div>
            <div
              :class="{
                'col-3 offset-1 q-pt-sm q-mt-sm': $q.platform.is.mobile,
                'col-3 offset-1 q-pt-lg q-mt-lg': $q.platform.is.desktop,
              }"
            >
              <q-btn
                push
                color="secondary"
                :label="$t('register')"
                class="btn-xs"
                icon-right="ti-angle-right"
                to="/BasicInfo"
              />
            </div>
          </div>
        </div>

        <div class="container" v-show="mostrarDivInicioSesion">
          <q-form @submit="loginPerson">
            <div
              :class="{
                'q-mx-sm q-pt-sm': $q.platform.is.mobile,
                'q-mx-xl q-pt-md': $q.platform.is.desktop,
              }"
            >
              <div
                :class="{
                  'q-mx-sm q-pt-sm': $q.platform.is.mobile,
                  'q-mx-xl q-pt-md': $q.platform.is.desktop,
                }"
              >
                <p class="q-pl-md" style="font-family: Raleway">
                  <strong>{{ $t("emailText") }}*</strong>
                </p>
                <q-input
                  outlined
                  v-model="email"
                  type="email"
                  class="input_belat"
                  stack-label
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe tu email',
                  ]"
                />
              </div>
            </div>
            <div
              :class="{
                'q-mx-sm': $q.platform.is.mobile,
                'q-mx-xl': $q.platform.is.desktop,
              }"
            >
              <div
                :class="{
                  'q-mx-sm': $q.platform.is.mobile,
                  'q-mx-xl': $q.platform.is.desktop,
                }"
              >
                <p class="q-pl-md" style="font-family: Raleway">
                  <strong>{{ $t("passwordText") }}</strong>
                </p>
                <q-input
                  outlined
                  v-model="password"
                  class="input_belat"
                  stack-label
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe tu contraseña',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row q-pt-md">
              <div class="col-3 q-pl-xl q-ml-xl col-xs-12 col-sm-12 col-md-3">
                <q-btn
                  outline
                  color="secondary"
                  label="VOLVER"
                  class="btn q-ml-sm"
                  @click="mostrarPaises"
                />
              </div>
              <div class="col-3 offset-5 col-xs-12 col-sm-12 col-md-3">
                <q-btn
                  push
                  color="secondary"
                  label="INGRESAR"
                  class="btn q-ml-sm"
                  icon-right="ti-angle-right"
                  type="submit"
                />
              </div>
            </div>
            <div
              class="q-pt-md q-mr-xl q-pr-xl col-3 col-xs-12 col-sm-12 col-md-3 q-gutter-sm text-right"
            >
              <span style="font-family: Raleway">
                <a href="www.google.com" target="_blank"
                  >¿Olvidaste tu contraseña?</a
                ></span
              >
            </div>
          </q-form>
        </div>
      </div>
    </div>

    <div class="row" v-show="mostrarDivPaises">
      <div class="col-7 offset-md-5 col-xs-12 col-sm-12 col-md-7"></div>
    </div>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
//import { apiInvestmentPlatform } from "src/boot/axios";
import { ref } from "vue";

export default {
  setup() {
    return {
      email: ref(null),
      password: ref(null),
      isPwd: ref(true),
      countrySelected: null,
    };
  },
  data() {
    return {
      mostrarDivPaises: true,
      mostrarDivInicioSesion: false,
      buttonPropsEs: {
        push: true,
      },
      buttonPropsBr: {
        outline: true,
      },
      buttonPropsEn: {
        outline: true,
      },
      user: {},
    };
  },
  methods: {
    changeLanguageEs(locale) {
      this.$i18n.locale = locale;
      this.buttonPropsEs.outline = false;
      this.buttonPropsEs.push = true;

      this.buttonPropsEn.outline = true;
      this.buttonPropsEn.push = false;

      this.buttonPropsBr.outline = true;
      this.buttonPropsBr.push = false;
      this.countrySelected = "ESPAÑOL";
    },
    changeLanguageBr(locale) {
      this.$i18n.locale = locale;

      this.buttonPropsBr.outline = false;
      this.buttonPropsBr.push = true;

      this.buttonPropsEn.outline = true;
      this.buttonPropsEn.push = false;

      this.buttonPropsEs.outline = true;
      this.buttonPropsEs.push = false;
      this.countrySelected = "PORTUGUES";
    },
    changeLanguageEn(locale) {
      this.$i18n.locale = locale;
      this.buttonPropsEn.outline = false;
      this.buttonPropsEn.push = true;

      this.buttonPropsEs.outline = true;
      this.buttonPropsEs.push = false;

      this.buttonPropsBr.outline = true;
      this.buttonPropsBr.push = false;
      this.countrySelected = "INGLES";
    },
    OcultarDivPaises() {
      //this.mostrarDivPaises = false;
      //this.mostrarDivInicioSesion = true;

      if (this.countrySelected === null) {
        window.location.href = "https://plataforma.qa.bancaeticalat.com/";
      } else if (this.countrySelected === "ESPAÑOL") {
        window.location.href = "https://plataforma.qa.bancaeticalat.com/";
      } else if (this.countrySelected === "PORTUGUES") {
        window.location.href = "http://belatbr.takasolutions.com.br";
      } else {
        window.location.href = "https://plataforma.qa.bancaeticalat.com/";
      }
    },
    mostrarPaises() {
      this.mostrarDivPaises = true;
      this.mostrarDivInicioSesion = false;
    },
    async loginPerson() {
      try {
        const res = await api.post("/loginPerson", {
          email: this.email,
          password: this.password,
        });

        // Verificar el estado de la respuesta
        if (res.status === 200) {
          // Procesar la respuesta exitosa aquí
          console.log("Inicio de sesión exitoso:", res.data);
          window.location.href = "https://plataforma.qa.bancaeticalat.com/";
        } else {
          // Manejar respuestas 400 y 500 de manera específica
          if (res.status === 400) {
            console.log("Error de cliente - Petición incorrecta:", res.data);
            this.$q.notify({
              message: "Credenciales incorrectas, intentelo nuevamente",
              type: "negative",
            });
          } else if (res.status >= 500) {
            console.log("Error del servidor:", res.data);
            this.$q.notify({
              message: "Credenciales incorrectas, intentelo nuevamente",
              type: "negative",
            });
          }
        }
      } catch (error) {
        // Manejar errores de red, timeout, etc.
        console.log("Error en la solicitud:", error);
        this.$q.notify({
          message: "Credenciales incorrectas, intentelo nuevamente",
          type: "negative",
        });
      }
    },
  },
};

//const token = ref("");
//const expiresIn = ref("");

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
<style scoped>
.fondo_azul {
  background-image: url("../assets/fondo_azul.png");
}
</style>
