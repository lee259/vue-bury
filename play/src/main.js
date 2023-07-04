import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import vTracking from "v-tracking";
const app = createApp(App);
app.use(router);
app.use(vTracking, { isVisTP: true });
app.mount("#app");
