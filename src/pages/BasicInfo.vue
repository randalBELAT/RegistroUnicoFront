<template>
  <q-page padding>
    <p
      :class="{
        '': $q.platform.is.mobile,
        'q-pl-lg': $q.platform.is.desktop,
      }"
      style="font-family: Raleway; color: #032a5a"
    >
      {{ $t("welcomeBasicInfo") }}
    </p>

    <!-- Stepper -->
    <div
      :class="{
        '': $q.platform.is.mobile,
        'q-pr-xs q-pl-xs': $q.platform.is.desktop,
      }"
      v-show="mostrarBasicInfoDiv"
    >
      <q-stepper
        v-model="piniaStore.step"
        vertical
        flat
        animated
        style="font-family: Raleway"
      >
        <!-- STEP 1 -->
        <q-step
          :name="1"
          :title="$t('contactData')"
          icon="settings"
          :done="piniaStore.step > 1"
        >
          <PersonaBasicInfo />
        </q-step>

        <!-- DESCOMPONER STEP 2 -->
        <q-step
          :name="2"
          :title="$t('personalData')"
          icon="person"
          :done="piniaStore.step > 2"
        >
          <!-- <PersonalData /> -->

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
                      (val) =>
                        this.validateRut(val) === true || this.validateRut(val),
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
                    :rules="[
                      (val) => (val && val.length > 0) || 'Ingresa tu Cuit',
                    ]"
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
                    :rules="[
                      (val) => (val && val.length > 0) || 'Ingresa tu dni',
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
                    v-model="person.dni"
                    :label="$t('dni')"
                    class="input_belat"
                    stack-label
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'Ingresa tu dni',
                    ]"
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
                      (val) =>
                        (val && val.length > 0) || 'Escribe tu dirección',
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
                          <q-date
                            v-model="person.birthdayDate"
                            mask="DD/MM/YYYY"
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
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
                        (val && val.length > 0) ||
                        'Selecciona tu nivel educacional',
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
                      (val) =>
                        (val && val.length > 0) || 'Selecciona tu actividad',
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
                        (val && val.length > 0) ||
                        'Escribe tu profesión u oficio',
                    ]"
                  />
                </div>
              </div>
              <div
                v-if="person.modelCountries === 'CHILE'"
                class="row q-gutter-sm"
              >
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
                        (val && val.length > 0) ||
                        'Selecciona tu rango de ingresos',
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
                        (val && val.length > 0) ||
                        'Selecciona tu rango de ingresos',
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
                        (val && val.length > 0) ||
                        'Ingresa el rut de la empresa',
                      (val) =>
                        this.validateRut(val) === true || this.validateRut(val),
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
                        (val && val.length > 0) ||
                        'Ingresa el dni de la empresa',
                      (val) =>
                        this.validateRut(val) === true || this.validateRut(val),
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
                      (val) =>
                        this.validateRut(val) === true || this.validateRut(val),
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
                      (val) =>
                        this.validateRut(val) === true || this.validateRut(val),
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
                      (val) =>
                        (val && val.length > 0) || 'Escribe la razón social',
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
                      @click="this.piniaStore.handleChangeStep(1)"
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
        </q-step>

        <!-- STEP 3 -->
        <q-step
          :name="3"
          :title="$t('declarations')"
          icon="person"
          :done="piniaStore.step > 3"
        >
          <DeclarationData />
        </q-step>

        <!-- STEP 4 -->
        <q-step
          :name="4"
          :title="$t('userCreation')"
          icon="person"
          :done="piniaStore.step > 4"
        >
          <UserCreation />
        </q-step>
      </q-stepper>
    </div>

    <!-- Investor profile -->
    <div v-show="mostrarInvestorProfileDiv">
      <!--INICIO - Sección que se disponibilizará solo al principio-->
      <div class="wrap">
        <div class="row justify-center">
          <h2 class="home-title text-center" style="font-family: Raleway">
            PERFIL DE <span class="primary">INVERSIONISTA</span>
          </h2>
        </div>
        <div class="row justify-center q-ma-md">
          <p
            class="q-mx-xl home-subtitle col-6 text-center"
            style="font-family: Raleway"
          >
            Preparamos algunas preguntas para conocer tu perfil de inversionista
          </p>
        </div>
        <div class="home-subtitle col-6 text-center">
          <q-img
            src="../assets/perfil_riesgo.svg"
            :ratio="1"
            width="500px"
            height="400px"
            :fit="fill"
          />
        </div>
        <div class="row justify-center q-ma-md">
          <p
            class="q-mx-xl home-subtitle col-6 text-center"
            style="font-family: Raleway"
          >
            Tus respuestas nos ayudarán a comprender tu perfil y brindarte un
            mejor servicios
          </p>
        </div>
        <div class="row justify-center q-ma-md q">
          <q-stepper-navigation>
            <q-btn
              color="secondary"
              label="CONTINUAR"
              rounded
              icon-right="ti-angle-right"
              class="btn-xs"
              @click="volverInvestorProfileDiv"
            ></q-btn>
          </q-stepper-navigation>
        </div>
      </div>
      <!--FIN - Sección que se disponibilizará solo al principio-->
    </div>

    <!-- Contact button -->
    <ContactBtn />
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
//import { apiInvestmentPlatform } from "src/boot/axios";
import { ref } from "vue";
import { usePiniaStore } from "../stores/PiniaStore";

//Imported components
import ContactBtn from "./ContactBtn.vue";
import PersonaBasicInfo from "./PersonaBasicInfo.vue";
// import PersonalData from "./PersonalData.vue";
import DeclarationData from "./DeclarationsData.vue";
import UserCreation from "./UserCreation.vue";

export default {
  components: {
    ContactBtn,
    PersonaBasicInfo,
    // PersonalData,
    DeclarationData,
    UserCreation,
  },
  setup() {
    const piniaStore = usePiniaStore();
    const person = piniaStore.person;
    const step = piniaStore.step;

    return {
      piniaStore,
      person,
      step,
      modelPersonType: ref(null),
      dniFrontImage: null,
      dniBackImage: null,
      dni: ref(null),
      city: ref(null),
      address: ref(null),
      ageRange: ref(null),
      idLaboralActivity: ref(null),
      profession: ref(null),
      incomeRange: ref(null),
      policy: ref(null),
      taxResidence: ref(null),
      usaResidence: ref(null),
      qualifiedInvestor: ref(null),
      investAmount: ref(null),
      investAmountHigh: ref(null),
      investAmountActive: ref(null),
      investAmountDuration: ref(null),
      riskKnowlegde: ref(null),
      amlAcceptation: ref(null),
      idEducationLevel: ref(null),
      password: ref(""),
      rePassword: ref(""),
      isPwd: ref(true),
      number1: ref(""),
      number2: ref(""),
      number3: ref(""),
      number4: ref(""),
      Correo: ref("correo@correo.com"),

      personType: ["NATURAL", "JURIDICA"],
      cities: ["SANTIAGO", "VALPARAISO", "VIÑA DEL MAR", "RANCAGUA"],
      ageRanges: ["18-25", "26-35", "36-45", "46-60", "+60"],

      optionsYesOrNo: [
        { label: "Si", value: "true" },
        { label: "no", value: "false" },
      ],
      file: null,
      // error: "",
      birthdayDate: ref(null),

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
    return {
      mostrarAml: false,
      mostrarQuestions: true,
      mostrarBasicInfoDiv: true,
      mostrarInvestorProfileDiv: false,
      legalPerson: false,
      termsCondition: false,
      errorPass: "",
      messagePass: "",
      showModalPep: false,
      showModalFatca: false,
      showModalCrs: false,
      showModalQualifiedInvestor: false,
    };
  },
  mounted() {
    this.codeVerification();
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
      this.piniaStore.handleChangeStep(3);
    },

    savePersonPersonalDataCompany() {
      try {
        const res = api.post("/registerPersonPersonalData", {
          email: this.email,
          idCity: this.city,
          address: this.address,
          idAgeRange: this.ageRange,
          idLaboralActivity: this.idLaboralActivity,
          professionOrOccupation: this.profession,
          idIncomeRange: this.incomeRange,
          idEducationLevel: this.idEducationLevel,
        });
      } catch (error) {
        console.log(error);
      }

      this.piniaStore.handleChangeStep(4);
    },
    // savePersonDeclarations() {
    //   try {
    //     const res = api.post("/registerPersonDeclarations", {
    //       email: this.person.email,
    //       politicallyExposedPerson: this.person.policy,
    //       taxResidence: this.person.taxResidence,
    //       usaCitizen: this.person.usaResidence,
    //       qualifiedInvestor: this.person.qualifiedInvestor,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }

    //   this.mostrarAml = true;
    //   this.mostrarQuestions = false;
    // },
    // savePersonAmlCheck() {
    //   try {
    //     const res = api.post("/registerPersonAmlCheck", {
    //       email: this.person.email,
    //       amlCheck: this.person.amlAcceptation,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }

    //   this.step = 4;
    // },
    savePersonIdentityVerification() {
      try {
        const res = api.post("/registerPersonIdentityVerification", {
          email: this.person.email,
          dni: this.person.dni,
        });
      } catch (error) {
        console.log(error);
      }

      //Código para validar cuit Argentino

      /* if(cuit.length != 11) {
                    return false;
                }

                var acumulado   = 0;
                var digitos     = cuit.split("");
                var digito      = digitos.pop();

                for(var i = 0; i < digitos.length; i++) {
                    acumulado += digitos[9 - i] * (2 + (i % 6));
                }

                var verif = 11 - (acumulado % 11);
                if(verif == 11) {
                    verif = 0;
                } else if(verif == 10) {
                    verif = 9;
                }

                return digito == verif; */

      //const formDataDniFront = new FormData();
      //formDataDniFront.append("fileDniFronImage", this.dniFrontImage);

      //const formDataDniBack = new FormData();
      //formDataDniBack.append("fileDniBackImage", this.dniBackImage);

      /*   const formData = new FormData();
      formData.append("file", this.file);


      /* try {
        const res = api.post(
          "/upload",
          formData
          //dniPictureFront: formDataDniFront,
          //dniPictureBack: formDataDniBack,
        );

        console.log(res.data.message);

        //token.value = res.data.token;
        //expiresIn.value = res.data.expiresIn;
      } catch (error) {
        console.log(error);
      } */

      this.step = 7;
    },
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
    firsStep() {
      this.step = 2;
    },
    validateRut(rut) {
      if (rut.toString().trim() != "" && rut.toString().indexOf("-") > 0) {
        var caracteres = new Array();
        var serie = new Array(2, 3, 4, 5, 6, 7);
        var dig = rut.toString().substr(rut.toString().length - 1, 1);
        rut = rut.toString().substr(0, rut.toString().length - 2);

        for (var i = 0; i < rut.length; i++) {
          caracteres[i] = parseInt(rut.charAt(rut.length - (i + 1)));
        }

        var sumatoria = 0;
        var k = 0;
        var resto = 0;

        for (var j = 0; j < caracteres.length; j++) {
          if (k == 6) {
            k = 0;
          }
          sumatoria += parseInt(caracteres[j]) * parseInt(serie[k]);
          k++;
        }

        resto = sumatoria % 11;
        const dv = 11 - resto;

        if (dv == 10) {
          dv = "K";
        } else if (dv == 11) {
          dv = 0;
        }

        if (
          dv.toString().trim().toUpperCase() ==
          dig.toString().trim().toUpperCase()
        ) {
          return true;
        } else {
          return "Formato de rut incorrecto, el formato debe ser (1234567-8) ";
        }
      } else {
        return "Formato de rut incorrecto, el formato debe ser (1234567-8) ";
      }
    },
    abrirPDF() {
      const pdfUrl = "../assets/politica.pdf";
      window.open(pdfUrl, "_blank");
    },
    //Metodos para realizar modificaciones visuales sobre el Front-End
    OcultarbasicInfoDiv() {
      this.mostrarBasicInfoDiv = false;
      this.mostrarInvestorProfileDiv = true;
    },
    volverInvestorProfileDiv() {
      this.step = 6;
      this.mostrarBasicInfoDiv = true;
      this.mostrarInvestorProfileDiv = false;
    },
    mostrarDivAml() {
      this.mostrarAml = true;
      this.mostrarQuestions = false;
    },
    // ocultarDivAml() {
    //   this.mostrarQuestions = true;
    //   this.mostrarAml = false;
    // },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    handleFileUploadFront(event) {
      this.dniFrontImage = event.target.files[0];
    },
    handleFileUploadBack(event) {
      this.dniBackImage = event.target.files[0];
    },
    handleFileChange() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const base64Data = event.target.result;
          this.file = base64Data;
        };

        reader.readAsDataURL(file);
      }
    },
    handleFileChange2() {
      const fileInput2 = this.$refs.fileInput2;
      const file2 = fileInput2.files[0];

      if (file2) {
        const reader2 = new FileReader();

        reader2.onload = (event) => {
          const base64Data2 = event.target.result;
          this.file2 = base64Data2;
        };

        reader.readAsDataURL(file2);
      }
    },
    uploadFile() {
      const formData = new FormData();
      formData.append("file", this.file);

      api
        .post("/upload", formData)
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
