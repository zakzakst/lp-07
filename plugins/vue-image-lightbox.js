import Vue from 'vue'
import LightBox from 'vue-image-lightbox'
import 'vue-image-lightbox/dist/vue-image-lightbox.min.css'
import VueLazyLoad from 'vue-lazyload'

Vue.component('LightBox', LightBox)
Vue.use(VueLazyLoad)
