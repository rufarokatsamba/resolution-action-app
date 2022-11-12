import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "@/assets/css/tailwind.css";
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faChalkboardTeacher,
  faPoll
} from '@fortawesome/free-solid-svg-icons';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt), faChalkboardTeacher, faPoll;

Vue.use(VeeValidate);
Vue.use(VueSweetalert2);

Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
