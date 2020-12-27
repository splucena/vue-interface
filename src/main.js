import Vue from "vue";
import App from "./App.vue";

// import bootstrap js
import "bootstrap";
// import bootstrap css
import "bootstrap/dist/css/bootstrap.css";
// import fontawesome
import {library} from "@fortawesome/fontawesome-svg-core";
// import specific icons from fontawesome
import {
  faPlus, faMinus, faTrash, faCheck
} from "@fortawesome/free-solid-svg-icons";
// add icons to library
library.add(faPlus, faMinus, faTrash, faCheck);

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App),
}).$mount("#app");
