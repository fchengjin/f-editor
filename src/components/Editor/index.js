import MdEditor from './editor.vue'
import MdRender from './render.vue'
import './lib/css/editor.scss'
export default {
  MdEditor,
  MdRender,
  install (Vue) {
    Vue.component('MdEditor', MdEditor)
    Vue.component('MdRender', MdRender)
  }
}
