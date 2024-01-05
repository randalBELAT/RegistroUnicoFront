<template>
  <div class="container">
    <q-form @submit="savePersonBasicInfo">
      <div class="row q-gutter-sm">
        <!-- Country selection -->
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-select
            outlined
            v-model="person.modelCountries"
            :options="countries"
            :label="$t('chooseCountry')"
            class="  "
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor selecciona un pais',
            ]"
            emit-value
            map-options
          />
        </div>

        <!-- Name input -->
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-input
            outlined
            :dense="dense"
            v-model="person.name"
            :label="$t('namePersonSelect')"
            class="input_belat"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Escribe tu nombre']"
          />
        </div>
      </div>

      <div class="row q-gutter-sm">
        <!-- Last name input -->
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-input
            outlined
            :dense="dense"
            v-model="person.lastname"
            :label="$t('lastnamePersonSelect')"
            class="input_belat"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Escribe tu apellido']"
          />
        </div>
        <!-- Email input -->
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-input
            outlined
            :dense="dense"
            v-model="person.email"
            :label="$t('emailSelect')"
            type="email"
            class="input_belat"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Escribe tu email']"
          />
        </div>
      </div>
      <div class="row q-gutter-sm">
        <!-- Phone input -->
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-input
            outlined
            :dense="dense"
            v-model="person.phone"
            :label="$t('phoneSelect')"
            class="input_belat"
            mask="### ########"
            fill-mask
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Escribe tu número de telefono',
            ]"
          />
        </div>
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <!-- Communication Chanel -->
          <q-select
            outlined
            v-model="person.modelCommunicationChannel"
            :options="communicationChannel"
            :label="$t('contactChannelSelect')"
            class="select_belat"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Selecciona el medio de contacto',
            ]"
          />
        </div>
      </div>
      <div class="row q-gutter-sm">
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <!-- Checkbox Terms Conditions -->
          <q-checkbox
            v-model="person.termsCondition"
            color="secondary"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Acepta los terminos y condiciones',
            ]"
          />
          <span style="font-family: Raleway">
            {{ $t("termsConditionAgree1") }}
            <a href="../src/assets/politica.pdf" target="_blank">{{
              $t("termsConditionAgree2")
            }}</a></span
          >
        </div>
      </div>
      <div class="row q-gutter-sm">
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <!-- Checkbox Legal Person -->
          <q-checkbox v-model="person.legalPerson" color="secondary" />
          <span style="font-family: Raleway">
            ¿Vienes en representación de una empresa?</span
          >
        </div>
      </div>

      <div class="row q-gutter-sm">
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm"></div>
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <!-- Continue Btn -->
          <q-stepper-navigation class="text-right">
            <q-btn
              color="secondary"
              :label="$t('continue')"
              push
              icon-right="ti-angle-right"
              class="btn-xs"
              type="submit"
            />
          </q-stepper-navigation>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { usePiniaStore } from "../stores/PiniaStore";

export default {
  name: "PersonaBasicInfo",
  setup() {
    const piniaStore = usePiniaStore();

    const modelCountries = piniaStore.modelCountries;
    const person = piniaStore.person;

    return {
      piniaStore,
      modelCountries,
      person,

      dense: ref(false),
      name: ref(null),
      email: ref(null),
      phone: ref(null),
      lastname: ref(null),
      modelCommunicationChannel: ref(null),
      communicationChannel: [
        "EMAIL",
        "TELEFONO",
        "WHATSAPP",
        "SIN PREFERENCIA",
      ],
      error: "",
    };
  },
  data() {
    return {
      // person: {},
      countries: [],
    };
  },
  mounted() {
    this.getCountriesSelect();
  },
  props: {
    handleChangeStep: {
      type: Function,
      required: true,
    },
  },
  methods: {
    getCountriesSelect() {
      api
        .get("/getCountries", {
          headers: {
            "Access-Control-Allow-Origin": "*", // Establece el encabezado para permitir cualquier origen (puedes ajustarlo según tu configuración)
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.countries = response.data
            .map((country) => ({
              label: country.name,
              value: country.name,
            }))
            .sort((a, b) => {
              // Ordenar alfabéticamente por la etiqueta (nombre del país)
              if (a.label < b.label) return -1;
              if (a.label > b.label) return 1;
              return 0;
            });
        })
        .catch((error) => {
          console.error("Error al obtener países:", error);
        });
    },

    savePersonBasicInfo() {
      console.log(this.person.termsCondition);

      if (!this.person.termsCondition) {
        this.$q.notify({
          message: "Se deben aceptar los términos y condiciones",
          type: "negative",
        });
      } else {
        try {
          const res = api.post("/registerPerson", {
            idCountry: this.person.modelCountries,
            name: this.person.name,
            lastname: this.person.lastname,
            email: this.person.email,
            phone: this.person.phone,
            idContactChannel: this.person.modelCommunicationChannel,
            termsCondition: this.person.termsCondition,
            legalPerson: this.person.legalPerson,
          });
        } catch (error) {
          console.log(error);
        }

        // Llamada del metodo padre para cambiar el step
        this.handleChangeStep(2);
      }
    },
  },
};
</script>
