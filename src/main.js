import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import VueLazyload from 'vue-lazyload'
import {store} from '@/store/index.js'
import Toast from '@/components/common/Toast'
import FastClick from 'fastclick';

//使用轮播图插件
Vue.use(VueAwesomeSwiper);
//使用自定义Toast插件
Vue.use(Toast)
//图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@/assets/img/lazy/loading.svg'),
  attempt: 1
})
//事件总线
Vue.prototype.$bus = new Vue()
//fastclick
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
