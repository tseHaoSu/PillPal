//import bootstrap css
import "bootstrap/dist/css/bootstrap.css";
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Vue and Vue Router
import router from "./router";

// Import PrimeVue components
import PrimeVue from "primevue/config";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
import Ripple from "primevue/ripple";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import FloatLabel from "primevue/floatlabel";
import Inputtext from "primevue/inputtext";
import Button from "primevue/button";

//Import PrimeVue CSS files
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

//import APP
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  ripple: true,
  inputStyle: "outlined",
});

app.component("Menubar", Menubar);
app.component("InputText", InputText);
app.component("Avatar", Avatar);
app.component("Badge", Badge);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("FloatLabel", FloatLabel);
app.component("Inputtext", Inputtext);
app.component("Button", Button);

app.directive("ripple", Ripple);

app.mount("#app");
