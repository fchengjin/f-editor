import FEditor from './editor.vue'
import FRender from './render.vue'
import './lib/css/editor.scss'
export default {
  FEditor,
  FRender,
  install (Vue) {
    Vue.component('FEditor', FEditor)
    Vue.component('FRender', FRender)
  }
}
