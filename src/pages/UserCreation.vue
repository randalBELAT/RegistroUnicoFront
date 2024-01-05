<template>
  <div class="wrap">
    <q-form @submit="savePersonUserCreate">
      <div class="row justify-left">
        <h2 class="home-sub-title text-center" style="font-family: Raleway">
          {{ $t("readyAccount") }}
        </h2>
      </div>
      <div class="row justify-left q-gutter-sm">
        <p class="home-subtitle col-8 q-gutter-sm" style="font-family: Raleway">
          {{ $t("codeVerificationText") }} {{ this.email }}
        </p>
      </div>
      <div class="row justify-left q-gutter-sm">
        <div class="col-1 q-gutter-sm">
          <q-input
            outlined
            v-model="piniaStore.person.number1"
            label=""
            class="input_belat"
            type="tel"
            :rules="[(val) => val.length <= 1 || '']"
          />
        </div>
        <div class="col-1 q-gutter-sm">
          <q-input
            outlined
            v-model="piniaStore.person.number2"
            label=""
            class="input_belat"
            type="tel"
            :rules="[(val) => val.length <= 1 || '']"
          />
        </div>
        <div class="col-1 q-gutter-sm">
          <q-input
            outlined
            v-model="piniaStore.person.number3"
            label=""
            class="input_belat"
            type="tel"
            size="xs"
            :rules="[(val) => val.length <= 1 || '']"
          />
        </div>
        <div class="col-1 q-gutter-sm">
          <q-input
            outlined
            v-model="piniaStore.person.number4"
            label=""
            class="input_belat"
            type="tel"
            size="xs"
            :rules="[(val) => val.length <= 1 || '']"
          />
        </div>
      </div>
      <div class="row q-gutter-sm">
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-input
            outlined
            v-model="piniaStore.person.password"
            :label="$t('password')"
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
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-input
            v-model="piniaStore.person.rePassword"
            outlined
            :type="isPwd ? 'password' : 'text'"
            stack-label
            :label="$t('rePassword')"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Repite tu contraseña',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isRePwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <p v-if="errorPass" style="color: red">{{ errorPass }}</p>
          <p v-else-if="messagePass" style="color: red">
            {{ messagePass }}
          </p>
        </div>
      </div>

      <q-stepper-navigation>
        <div class="row q-gutter-sm">
          <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
            <q-btn
              outline
              round
              @click="handleChangeStep(3)"
              color="secondary"
              :label="$t('back')"
              class="btn-xs q-ml-sm"
              icon="ti-angle-left"
            />
          </div>
          <div
            class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm text-right"
          >
            <q-btn
              color="secondary"
              :label="$t('continue')"
              push
              icon-right="ti-angle-right"
              class="btn-xs"
              type="submit"
            />
          </div>
        </div>
      </q-stepper-navigation>
    </q-form>
  </div>
</template>
<script>
import { api } from "src/boot/axios";
//import { apiInvestmentPlatform } from "src/boot/axios";
import { ref } from "vue";
import { usePiniaStore } from "../stores/PiniaStore";

export default {
  setup() {
    const piniaStore = usePiniaStore();

    return {
      piniaStore,
      password: ref(""),
      rePassword: ref(""),
      isPwd: ref(true),
      number1: ref(""),
      number2: ref(""),
      number3: ref(""),
      number4: ref(""),
    };
  },
  data() {
    return {
      mostrarAml: false,
      mostrarQuestions: true,
      mostrarBasicInfoDiv: true,
      mostrarInvestorProfileDiv: false,
      legalPerson: false,
      termsCondition: false,
      errorPass: "",
      messagePass: "",
    };
  },
  props: {
    handleChangeStep: {
      type: Function,
      required: true,
    },
  },

  methods: {
    savePersonUserCreate() {
      if (this.person.password !== this.person.rePassword) {
        this.errorPass = "Las contraseñas no coinciden";
        this.messagePass = "";
      } else {
        this.errorPass = "";
        this.messagePass = "";

        api
          .post("/codeValidation", {
            email: this.person.email,
            registrationCode1: this.person.number1,
            registrationCode2: this.person.number2,
            registrationCode3: this.person.number3,
            registrationCode4: this.person.number4,
          })
          .then((response) => {
            console.log(response.data.error);
            console.log(response.status);

            try {
              if (response.status == 200) {
                const res = api.post("/registerPersonUserValidation", {
                  email: this.person.email,
                  password: this.person.password,
                  repassword: this.person.rePassword,
                });
              } else {
                console.log("Error de verificacion de codigo");
              }
            } catch (error) {
              console.log(error);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    //Metodos auxiliares
    async codeVerification() {},
  },
};
</script>
