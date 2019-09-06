import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./stores"
import fastclick from 'fastclick'
import "@/common/stylus/index.styl"
import axios from 'axios'
import Http from '@/plugins/http.js'
import VueLazyload from 'vue-lazyload'

Vue.prototype.axios = axios

fastclick.attach(document.body);
Vue.config.productionTip = false;

Vue.use(Http);

//使用图片懒加载组件
Vue.use(VueLazyload,{
  loading: require('@/common/image/default.png')  //默认图片
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");