# md-editor
一个基于vue的markdown编辑器和渲染器
由[mavon-editor 2.7.5](https://github.com/hinesboy/mavonEditor)版本修改而成。支持服务端渲染。拆分成两个组件:mdEditor和mdRender。

## 注意事项
 如果使用图片上传功能，一定要配置
## 开始使用

### Es6

```shell
npm install f-md  --save // or
yarn add f-md
```
`index.js`
```javascript
// 全局注册
    import Vue from 'vue'
    import fMd from 'f-md'
    import 'f-md/dist/f-md.css'
    // use
    Vue.use(fMd)
    new Vue({
        'el': '#app',
        data() {
            return { value: '' }
        }
    })
```
`index.vue`
```html
<div>
  <f-editor v-model="value"></f-editor>
  <f-render :value="value"/>
</div>
```


### browser
```html
<div id="app">
  <f-editor v-model="value"></f-editor>
  <f-render :value="value"/>
</div>
<script src="path/to/vue.js"></script>
<script src="path/to/f-md.umd.js"></script>
<script>
  Vue.use(window['f-md'])
  new Vue({
    el: '#app',
    data() {
        return { value: '' }
    }
  })
</script>
```

### 在nuxt中使用
> 本插件支持SSR
1. 在工程目录plugins 下新建`f-md.js`
  ```javascript
  import Vue from 'vue'
  import fMd from 'f-md'
  import 'f-md/dist/f-md.css'
  // use
  Vue.use(fMd)
  ```

2. 在`nuxt.config.js`中添加plugins配置
```javascript
module.exports = {
  // ...
  plugins: [
    // ...
    { src: '@/plugins/f-md', ssr: true }
  ],
}
```

3. 在页面中使用

```html
<template>
  <div>
      <f-editor v-model="content"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "#### how to use f-md in nuxt.js"
    };
  }
};
</script>
```
## API文档

### props

