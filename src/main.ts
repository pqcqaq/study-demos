import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import vSlideIn from "./pages/v-slidein/cmd/vSlideIn";

const app = createApp(App);
// 注册全局指令
app.directive("slide-in", vSlideIn);
app.use(router).mount("#app");
