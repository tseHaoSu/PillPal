//import bootstrap css
import "bootstrap/dist/css/bootstrap.css";

// Import Vue and Vue Router
import router from "./router";

// Import PrimeVue components
import PrimeVue from "primevue/config";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
import Ripple from "primevue/ripple";

// Import PrimeVue CSS files
import "primevue/resources/themes/saga-blue/theme.css"; // Theme CSS file (you can choose other themes)
import "primevue/resources/primevue.min.css"; // Core CSS file
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";


//import APP
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    ripple: true,
    inputStyle: 'outlined',
});

app.component("Menubar", Menubar);
app.component("InputText", InputText);
app.component("Avatar", Avatar);
app.component("Badge", Badge);
app.directive("ripple", Ripple);

app.mount("#app");
