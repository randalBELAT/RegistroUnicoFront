<template>
  <div
    class="container"
    v-if="
      person.legalPerson === false ||
      person.legalPerson === undefined ||
      !person
    "
  >
    <q-form @submit="savePersonPersonalData">
      <div class="row q-gutter-sm">
        <div
          v-if="person.modelCountries === 'CHILE'"
          class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm"
        >
          <q-input
            outlined
            v-model="person.dni"
            :label="$t('rut')"
            class="input_belat"
            stack-label
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Ingresa tu rut',
              (val) => this.validateRut(val) === true || this.validateRut(val),
            ]"
          />
        </div>

        <div
          v-if="person.modelCountries === 'ARGENTINA'"
          class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm"
        >
          <q-input
            outlined
            v-model="person.dni"
            :label="$t('cuit')"
            class="input_belat"
            stack-label
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Ingresa tu Cuit']"
          />
        </div>

        <div
          v-if="person.modelCountries === 'BRASIL'"
          class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm"
        >
          <q-input
            outlined
            v-model="person.dni"
            :label="$t('dni')"
            class="input_belat"
            stack-label
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Ingresa tu dni']"
          />
        </div>

        <div
          v-if="
            person.modelCountries != 'CHILE' &&
            person.modelCountries != 'ARGENTINA' &&
            person.modelCountries != 'BRASIL'
          "
          class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm"
        >
          <q-input
            outlined
            v-model="person.dni"
            :label="$t('dni')"
            class="input_belat"
            stack-label
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Ingresa tu dni']"
          />
        </div>

        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-input
            outlined
            :dense="dense"
            for="address"
            ref="autocomplete"
            v-model="person.address"
            :label="$t('address')"
            class="input_belat"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Escribe tu dirección',
            ]"
          />
        </div>
      </div>

      <div class="row q-gutter-sm">
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-input
            outlined
            v-model="person.birthdayDate"
            :label="$t('birthday')"
            mask="##/##/####"
            :rules="[checkDate]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="person.birthdayDate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-select
            outlined
            v-model="person.idEducationLevel"
            :options="educationLevels"
            :label="$t('educationLevelSelect')"
            class="select_belat"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Selecciona tu nivel educacional',
            ]"
          />
        </div>
      </div>

      <div class="row q-gutter-sm">
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-select
            outlined
            v-model="person.idLaboralActivity"
            :options="laboralActivities"
            :label="$t('profession')"
            class="select_belat"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Selecciona tu actividad',
            ]"
          />
        </div>
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-input
            outlined
            :dense="dense"
            v-model="person.profession"
            :label="$t('activity')"
            class="input_belat"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Escribe tu profesión u oficio',
            ]"
          />
        </div>
      </div>

      <div v-if="person.modelCountries === 'CHILE'" class="row q-gutter-sm">
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-select
            outlined
            v-model="person.incomeRange"
            :options="chileanIncomeRanges"
            :label="$t('incomeRange')"
            class="select_belat"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Selecciona tu rango de ingresos',
            ]"
          />
        </div>
      </div>

      <div v-else class="row q-gutter-sm">
        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-select
            outlined
            v-model="person.incomeRange"
            :options="incomeRanges"
            :label="$t('incomeRange')"
            class="select_belat"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Selecciona tu rango de ingresos',
            ]"
          />
        </div>
      </div>

      <q-stepper-navigation>
        <div class="row q-gutter-sm">
          <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
            <q-btn
              round
              outline
              @click="piniaStore.step = 1"
              :label="$t('back')"
              class="btn-xs q-ml-sm"
              color="secondary"
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

  <div class="container" v-if="person.legalPerson === true">
    <q-form @submit="savePersonPersonalDataCompany">
      <div class="row q-gutter-sm">
        <div
          v-if="person.modelCountries === 'CHILE'"
          class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm"
        >
          <q-input
            outlined
            :dense="dense"
            v-model="person.dni"
            :label="$t('dni_business_chile')"
            class="input_belat"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Ingresa el rut de la empresa',
              (val) => this.validateRut(val) === true || this.validateRut(val),
            ]"
          />
        </div>

        <div
          v-if="person.modelCountries === 'ARGENTINA'"
          class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm"
        >
          <q-input
            outlined
            :dense="dense"
            v-model="person.dni"
            :label="$t('dni_business_argentina')"
            class="input_belat"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Ingresa el dni de la empresa',
              (val) => this.validateRut(val) === true || this.validateRut(val),
            ]"
          />
        </div>

        <div
          v-if="person.modelCountries === 'BRASIL'"
          class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm"
        >
          <q-input
            outlined
            :dense="dense"
            v-model="person.dni"
            :label="$t('dni_business_brasil')"
            class="input_belat"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Digite o CNPJ',
              (val) => this.validateRut(val) === true || this.validateRut(val),
            ]"
          />
        </div>

        <div
          v-if="
            person.modelCountries != 'CHILE' &&
            person.modelCountries != 'ARGENTINA' &&
            person.modelCountries != 'BRASIL'
          "
          class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm"
        >
          <q-input
            outlined
            :dense="dense"
            v-model="person.dni"
            :label="$t('dni_business_otros')"
            class="input_belat"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Ingrese Número identificador tributario de la empresa',
              (val) => this.validateRut(val) === true || this.validateRut(val),
            ]"
          />
        </div>

        <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
          <q-input
            outlined
            :dense="dense"
            v-model="person.profession"
            :label="$t('business_name')"
            class="input_belat"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Escribe la razón social',
            ]"
          />
        </div>
      </div>

      <q-stepper-navigation>
        <div class="row q-gutter-sm">
          <div class="col-5 col-xs-12 col-sm-12 col-md-5 q-gutter-sm">
            <q-btn
              outline
              round
              @click="piniaStore.step = 1"
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
import { usePiniaStore } from "src/stores/PiniaStore";

export default {
  name: "PersonalDataFalse",
  setup() {
    const piniaStore = usePiniaStore();
    const modelCountries = piniaStore.modelCountries;
    const person = piniaStore.person;

    return {
      piniaStore,
      person,
      modelCountries,

      educationLevels: [
        "EDUCACIÓN ESCOLAR INCOMPLETA",
        "EDUCACIÓN ESCOLAR COMPLETA",
        "EDUCACIÓN SUPERIOR INCOMPLETA",
        "EDUCACIÓN SUPERIOR COMPLETA",
        "POSTGRADO",
      ],
      laboralActivities: [
        "TRABAJADOR DEPENDIENTE",
        "TRABAJADOR INDEPENDIENTE",
        "JUBILADO",
        "LABORES DE CUIDADO",
        "ESTUDIANTE",
        "OTRA",
      ],
      incomeRanges: [
        "< 1000 USD",
        "1001-2000 USD",
        "2001-3000 USD",
        "3001-4000 USD",
        "> 4001 USD",
        "N.A.",
      ],
      chileanIncomeRanges: [
        "< $1.000.000",
        "$1.000.001-$3.000.000",
        "$3.000.001-$5.000.000",
        "$5.000.001-$10.000.000",
        "> $10.000.001",
        "N.A.",
      ],
    };
  },
  data() {
    return {};
  },
  methods: {
    savePersonPersonalData() {
      try {
        const res = api.post("/registerPersonPersonalData", {
          email: this.person.email,
          dni: this.person.dni,
          address: this.person.address,
          birthday: this.person.birthdayDate,
          idLaboralActivity: this.person.idLaboralActivity,
          professionOrOccupation: this.person.profession,
          idIncomeRange: this.person.incomeRange,
          idEducationLevel: this.person.idEducationLevel,
        });
      } catch (error) {
        console.log(error);
      }

      // Llamada del metodo padre para cambiar el step
      this.handleChangeStep(3);
    },
  },
};
</script>
