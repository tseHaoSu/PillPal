import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//import PrimeVue assets
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css"; // Theme CSS file (you can choose other themes)
import "primevue/resources/primevue.min.css"; // Core CSS file
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: "Aura",
  },
});

app.mount("#app");
