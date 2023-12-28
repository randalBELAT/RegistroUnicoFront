# Single Registry of Latin American Ethical Banking

This App is based [Vue](https://vuejs.org/) builded on the CLI of [Quasar](https://quasar.dev/)

This application is the unique registry of users of Latin American Ethical Banking, this unique registry is used as a platform to register in the database and be able to log in to the different platforms of our bank.

## Requirements

- [Node](https://nodejs.org/en) >= 14.19
- Npm >= 6.13.4 o Yarn >= 1.21.1

## Installation

In order to install our single registration platform locally, the following steps must be followed:

1. Clone our repository to have the files of our platform in your local environment

```bash
git clone https://github.com/randalBELAT/RegistroUnicoFront.git
```

2. Install the dependencies

```bash
yarn
# or
npm install
```

3. Install the [Quasar](https://quasar.dev/) CLI global, with it you can directly run Quasar commands in the terminal.

```bash
npm i -g @quasar/cli
# or
yarn global add @quasar/cli
```

For Build the app for production

```bash
quasar build
```

Now we can use commands such as 'npx quasar dev' to start our project and view it in the browser.

4. Install [Axios](https://axios-http.com/docs/intro) to facilitate interactions with the project's API, an efficient and easy-to-use tool that simplifies HTTP requests and data management between the software and the server.

```bash
npm install axios
# or
yarn add axios
```

5. The install [vue-i18n](https://vue-i18n.intlify.dev/) is required, to guarantee a multilingual experience adapted to different regions, an essential library that allows the internationalization and localization of the software.

```bash
npm install vue-i18n@9
# or
yarn add vue-i18n@9
```

6. Install [Pinea](https://pinia.vuejs.org/) is essential to ensure an efficient and fluid state management system within the software.

```bash
npm install pinia
# or
yarn add pinia
```

## Initializing Development Environment

After completing the installation steps, you can now initiate the application.
Use the following command to start the project and preview it in your browser:

```bash
npm run dev
# or with Quasar
npx quasar dev
# or with Yarn
yarn start
```
