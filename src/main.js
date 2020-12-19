import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./theme/index.css";
import "@/styles/index.scss"; // global css
import App from "./App";
import store from "./store";
import router from "./router";
import "babel-polyfill";
import "@/permission"; // permission control
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import $ from "jquery";
Vue.use(codemirror);
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$message = msg => {
  ElementUI.Message.closeAll();
  ElementUI.Message(msg);
};
Vue.prototype.$message.error = msg => {
  ElementUI.Message.closeAll();
  ElementUI.Message.error(msg);
};
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
