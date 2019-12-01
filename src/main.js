import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import axios from './http'
import store from './store/store'
import './permission';
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = process.env.NODE_ENV === 'production';
console.log('VUE_APP_BASE_API=',process.env.VUE_APP_BASE_API);
console.log('VUE_APP_SERVICE_URL=',process.env.VUE_APP_SERVICE_URL);

new Vue({
  router,
  axios,
  store,
  render: h => h(App)
}).$mount("#app");



