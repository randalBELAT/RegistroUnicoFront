<template>
  <div class="wrap" v-show="mostrarQuestions">
    <div class="row q-gutter-sm">
      <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
        <p>
          {{ $t("pep") }}<q-icon name="info" v-on:click="showModalPep = true" />
        </p>
        <q-option-group
          :options="[
            { label: $t('optionYes'), value: 'true' },
            { label: $t('optionNo'), value: 'false' },
          ]"
          type="radio"
          v-model="piniaStore.person.policy"
        />
      </div>
      <q-dialog v-model="showModalPep">
        <q-card>
          <q-card-section class="q-mb-md">
            <!-- Contenido del pop-up -->
            <p>{{ $t("pepText") }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Cerrar" v-close-popup></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
        <p>
          {{ $t("countryResidence")
          }}<q-icon name="info" v-on:click="showModalCrs = true" />
        </p>
        <q-option-group
          :options="[
            { label: $t('optionYes'), value: 'true' },
            { label: $t('optionNo'), value: 'false' },
          ]"
          type="radio"
          v-model="piniaStore.person.taxResidence"
        />
      </div>
      <q-dialog v-model="showModalCrs">
        <q-card>
          <q-card-section class="q-mb-md">
            <!-- Contenido del pop-up -->
            <p>{{ $t("crsText") }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Cerrar" v-close-popup></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="row q-gutter-sm">
      <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
        <p>
          {{ $t("usaResidence")
          }}<q-icon name="info" v-on:click="showModalFatca = true" />
        </p>
        <q-option-group
          :options="[
            { label: $t('optionYes'), value: 'true' },
            { label: $t('optionNo'), value: 'false' },
          ]"
          type="radio"
          v-model="piniaStore.person.usaResidence"
        />
      </div>
      <q-dialog v-model="showModalFatca">
        <q-card>
          <q-card-section class="q-mb-md">
            <!-- Contenido del pop-up -->
            <p>{{ $t("fatcaText") }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Cerrar" v-close-popup></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
        <p>
          {{ $t("qualifiedInvestor")
          }}<q-icon
            name="info"
            v-on:click="showModalQualifiedInvestor = true"
          />
        </p>
        <q-option-group
          :options="[
            { label: $t('optionYes'), value: 'true' },
            { label: $t('optionNo'), value: 'false' },
          ]"
          type="radio"
          v-model="piniaStore.person.qualifiedInvestor"
        />
      </div>
      <q-dialog v-model="showModalQualifiedInvestor">
        <q-card>
          <q-card-section class="q-mb-md">
            <!-- Contenido del pop-up -->
            <p>{{ $t("qualifiedInvestorText") }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Cerrar" v-close-popup> </q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="row q-gutter-sm q-pt-xl">
      <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
        <q-btn
          outline
          round
          @click="this.piniaStore.handleChangeStep(2)"
          color="secondary"
          :label="$t('back')"
          class="btn-xs q-ml-sm"
          icon="ti-angle-left"
        ></q-btn>
      </div>
      <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm text-right">
        <q-btn
          @click="savePersonDeclarations"
          color="secondary"
          :label="$t('continue')"
          push
          icon-right="ti-angle-right"
          class="btn-xs"
        ></q-btn>
      </div>
    </div>
  </div>
  <!--Otro div dentro del mismo stepper-->
  <div class="wrap" v-show="mostrarAml">
    <div class="row q-gutter-sm">
      <div class="col-8 col-xs-12 col-sm-12 col-md-8 q-gutter-sm">
        <p>
          {{ $t("amlDeclaration") }}
        </p>
      </div>
    </div>
    <div class="row q-gutter-sm">
      <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
        <q-checkbox
          v-model="piniaStore.person.amlAcceptation"
          color="secondary"
          true-value="yes"
          false-value="no"
        />
        <span style="font-family: Raleway">{{ $t("amlCheck") }}</span>
      </div>
    </div>

    <q-stepper-navigation>
      <div class="row q-gutter-sm">
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-btn
            outline
            round
            @click="ocultarDivAml"
            color="secondary"
            :label="$t('back')"
            class="btn-xs q-ml-sm"
            icon="ti-angle-left"
          ></q-btn>
        </div>
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm text-right">
          <q-btn
            @click="savePersonAmlCheck"
            color="secondary"
            :label="$t('continue')"
            push
            icon-right="ti-angle-right"
            class="btn-xs"
          ></q-btn>
        </div>
      </div>
    </q-stepper-navigation>
  </div>
</template>

<script>
import { ref } from "vue";
import { usePiniaStore } from "../stores/PiniaStore";

export default {
  setup() {
    const piniaStore = usePiniaStore();
    return {
      piniaStore,

      policy: ref(null),
      taxResidence: ref(null),
      usaResidence: ref(null),
      qualifiedInvestor: ref(null),
      amlAcceptation: ref(null),
    };
  },

  data() {
    return {
      mostrarAml: false,
      mostrarQuestions: true,
      showModalPep: false,
      showModalFatca: false,
      showModalCrs: false,
      showModalQualifiedInvestor: false,
    };
  },
  methods: {
    savePersonDeclarations() {
      try {
        const res = api.post("/registerPersonDeclarations", {
          email: this.person.email,
          politicallyExposedPerson: this.person.policy,
          taxResidence: this.person.taxResidence,
          usaCitizen: this.person.usaResidence,
          qualifiedInvestor: this.person.qualifiedInvestor,
        });
      } catch (error) {
        console.log(error);
      }

      this.mostrarAml = true;
      this.mostrarQuestions = false;
    },

    ocultarDivAml() {
      this.mostrarQuestions = true;
      this.mostrarAml = false;
    },

    savePersonAmlCheck() {
      try {
        const res = api.post("/registerPersonAmlCheck", {
          email: this.person.email,
          amlCheck: this.person.amlAcceptation,
        });
      } catch (error) {
        console.log(error);
      }

      // Llamada del metodo padre para cambiar el step
      this.piniaStore.handleChangeStep(4);
    },
  },
};
</script>
