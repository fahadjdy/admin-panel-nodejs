import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/routes.js";
import "./assets/css/styles.css";

createApp(App)
.use(router)
.mount("#app");
