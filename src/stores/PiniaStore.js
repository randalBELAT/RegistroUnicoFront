import { defineStore } from "pinia";
import { ref } from "vue";
// import { Ref } from "vue";

// export const usePiniaStore = defineStore("PineaStore", () => {
//   const step = ref(1);

//   function updateStep(newStep) {
//     step = newStep;
//   }

//   return { updateStep };
// });

export const usePiniaStore = defineStore("PiniaStore", {
  //STATES
  state: () => ({
    step: 1,
    modelCountries: null,
    person: {},
  }),

  //ACTIONS
  actions: {
    handleChangeStep(newStep) {
      this.step = newStep;
      console.log("Next step: " + this.step);
    },
  },
});
