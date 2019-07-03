<template>
  <div id="app">
    <f-editor
      v-model="content"
      style="height: 500px;"
      :toc-option="tocOption"
      :ishljs="ishljs"
    />
    <f-render :value="content" :ishljs="ishljs" :toc-option="tocOption" class="render-content"/>
    <button @click="toggle">toggle</button>
  </div>
</template>

<script>
import uslug from 'uslug'
import Editor from '@/components/Editor/index.js'
const { FEditor, FRender } = Editor
export default {
  name: 'app',
  data () {
    return {
      content: '',
      tocOption: {
        slugify: uslug
      },
      ishljs: false
    }
  },
  components: {
    FEditor,
    FRender
  },
  methods: {
    // 在编辑器上传图片时使用
    async handleImgAdd (pos, file, vm) {
      vm.loading = true
      try {
        const res = await this.upload(file)
        vm.$img2Url(pos, this.$cfg.getImgPath(res.name))
      } catch (e) {
        console.log('上传失败', e)
      }
      vm.loading = false
    },
    toggle () {
      this.ishljs = !this.ishljs
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.render-content {
  padding: 16px;
}
</style>
