<template>
  <div class="fixed-bottom-right q-pb-md q-pr-lg">
    <q-fab
      color="primary"
      icon="keyboard_arrow_up"
      label="Contactanos"
      label-position="left"
      direction="up"
    >
      <!-- Btn without functionality -->
      <q-fab-action
        color="secondary"
        @click="onClickMail"
        label="Mail"
        icon="mail"
      />
      <!-- Btn without functionality -->
      <q-fab-action
        color="secondary"
        @click="onClickWhatsapp"
        label="Whatsapp"
        icon="chat"
      />
    </q-fab>
  </div>
</template>

<script>
export default {
  name: "ContactBtn",
  methods: {
    onClickMail() {
      // lógica para la acción de correo
    },
    onClickWhatsapp() {
      // lógica para la acción de Whatsapp
    },
  },
};
</script>
