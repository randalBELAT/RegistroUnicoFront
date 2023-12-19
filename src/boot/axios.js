import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  //baseURL: "http://18.217.254.35:8000",
  withCredentials: true,
});

/* const apiInvestmentPlatform = axios.create({
  baseURL: "https://plataforma.test.bancaeticalat.com",
  headers: {
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
}); */

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
  //app.config.globalProperties.$apiInvestmentPlatform = apiInvestmentPlatform;
});

export { api };
