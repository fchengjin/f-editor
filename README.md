# f-editor
一个基于vue的markdown编辑器和渲染器
由[mavon-editor 2.7.5](https://github.com/hinesboy/mavonEditor)版本修改而成。支持服务端渲染。拆分成两个组件:fEditor和fRender。

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

| name 名称	| type 类型 | default默认值| applicable component适用组件|describe 描述|
| --- | ---- | ----|----|--- |
|value|String||fEditor, fRender|初始值|
|tocOption|Object|{}|fEditor, fRender|目录设置，参考[ftoc](https://github.com/fchengjin/markdown-it-ftoc#options)，注意`tocCallback`已被占用，如有需要，请监听`toc`事件|
|forbiddenHash|Boolean|true|fEditor, fRender|使用禁用hash跳转，避免触发vue路由切换动画|
|language|String|zh-CN	|fEditor|语言选择，暂支持 zh-CN: 中文简体 ， en: 英文 ， fr: 法语， pt-BR: 葡萄牙语， ru: 俄语， de: 德语， ja: 日语|
|fontSize|String|14px	|fEditor|编辑区域文字大小|
|scrollStyle	|Boolean|true	|fEditor, fRender|开启滚动条样式(暂时仅支持chrome)|
|boxShadow|Boolean|true	|fEditor|开启边框阴影|
|subfield	|Boolean|	true|	fEditor|true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)|
|defaultOpen|	String||	fEditor	|edit： 默认展示编辑区域 ， preview： 默认展示预览区域 , 其他 = edit|
|placeholder|	String|	开始编辑...|fEditor |	输入框为空时默认提示文本|
|editable|	Boolean|	true|fEditor|	是否允许编辑|
|codeStyle|	String|	code-github	|fEditor, fRender|markdown样式： 默认github, 可选配色方案|
|toolbarsFlag|	Boolean|	true|fEditor|	工具栏是否显示|
|navigation|	Boolean|	false|fEditor	|默认展示目录|
|shortCut|	Boolean|	true|	fEditor|是否启用快捷键|
|autofocus|	Boolean|	true|	fEditor|自动聚焦到文本框|
|ishljs|	Boolean|	true|fEditor, fRender|	代码高亮|
|imageFilter|	function|	null|fEditor	|图片过滤函数，参数为一个File Object，要求返回一个Boolean, true表示文件合法，false表示文件不合法|
|imageClick|	function|	null|fEditor, fRender	|图片点击事件，默认为预览，可覆盖|
|tabSize|	Number|	\t|fEditor	|tab转化为几个空格，默认为\t|
|toolbars|	Object|	如下例|	fEditor|工具栏|
|sToolbars|	Object|	如下例|fEditor|	小屏幕时的工具栏|

```javascript
/*
    默认工具栏按钮全部开启, 传入自定义对象
    例如: {
         bold: true, // 粗体
         italic: true,// 斜体
         header: true,// 标题
    }
    此时, 仅仅显示此三个功能键
 */
sToolbars:{
  underline: true,
  strikethrough: true,
  imagelink: true,
  table: true,
  undo: true,
  save: true,
  preview: true,
  navigation: true
},
toolbars: {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  fullscreen: true, // 全屏编辑
  readmodel: true, // 沉浸式阅读
  htmlcode: true, // 展示html源码
  help: true, // 帮助
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  save: true, // 保存（触发events中的save事件）
  navigation: true, // 导航目录
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  subfield: true, // 单双栏模式
  preview: true, // 预览
  }

```

### events 事件绑定
|name 方法名|	params 参数|applicable component适用组件	|describe 描述|
|---|---|---|---|
|toc|	String: tocHtml|fEditor, fRender|生成目录时触发，参数为生成目录的html，参数修改参考tocOption选项|
|input|	String: value| fEditor|编辑区内容发生改变时触发，参数为编辑区内容|
|render|	String: value|fEditor, fRender |markdown渲染时触发， 参数为渲染结果|
|save|	String: value , String: render|fEditor|	ctrl + s 的回调事件(保存按键,同样触发该回调)|
|fullScreen|	Boolean: status , String: value|	fEditor|切换全屏编辑的回调事件(boolean: 全屏开启状态)|
|readModel|	Boolean: status , String: value|	fEditor|切换沉浸式阅读的回调事件(boolean: 阅读开启状态)|
|htmlCode|	Boolean: status , String: value|	fEditor|查看html源码的回调事件(boolean: 源码开启状态)|
|subfieldToggle|	Boolean: status , String: value|fEditor|	切换单双栏编辑的回调事件(boolean: 双栏开启状态)|
|previewToggle|	Boolean: status , String: value|	fEditor|切换预览编辑的回调事件(boolean: 预览开启状态)|
|helpToggle|	Boolean: status , String: value|fEditor	|查看帮助的回调事件(boolean: 帮助开启状态)|
|navigationToggle|	Boolean: status , String: value|fEditor|	切换导航目录的回调事件(boolean: 导航开启状态)|
|imgAdd|	String: filename, File: imgfile, VueInstance: $vm|	fEditor|图片文件添加回调事件(filename: 写在md中的文件名, File: File Object, $vm 编辑器实例)|

### slot插槽
> 只适用于fEditor

|name 插槽名称	|describe 描述|
|---|---|
|left-toolbar-before|左侧工具栏前方|
|left-toolbar-after|左侧工具栏后方|
|right-toolbar-before|右侧工具栏前方|
|right-toolbar-after|右侧工具栏后方|         

### 快捷键
> 只适用于fEditor

| key       | keycode  |            功能            |
| -------- | :-----------: | :---------: |
| F8           | 119 |  开启/关闭导航  |
| F9           | 120   |  预览/编辑切换  |
| F10     | 121   | 开启/关闭全屏 |
| F11      | 122   | 开启/关闭阅读模式 |
| F12       | 123   | 单栏/双栏切换 |
| TAB  | 9  | 缩进 |
| CTRL + S    | 17 + 83 | 触发保存 |
| CTRL + D    | 17 + 68 | 删除选中行 |
| CTRL + Z    | 17 + 90 | 上一步 |
| CTRL + Y    | 17 + 89 | 下一步 |
| CTRL + BreakSpace    | 17 + 8 | 清空编辑 |
| CTRL + B       | 17 + 66 | **加粗** |
| CTRL + I | 17 + 73 | *斜体* |
| CTRL + H       | 17 + 72 | # 标题 |
| CTRL + 1       | 17 + 97 or 49 | # 标题 |
| CTRL + 2       | 17 + 98 or 50 | ## 标题 |
| CTRL + 3       | 17 + 99 or 51 | ### 标题 |
| CTRL + 4       | 17 + 100 or 52 | #### 标题 |
| CTRL + 5       | 17 + 101 or 53 | ##### 标题 |
| CTRL + 6       | 17 + 102 or 54 | ###### 标题 |
| CTRL + U    | 17 + 85 | ++下划线++ |
| CTRL + M    | 17 + 77 | ==标记== |
| CTRL + Q    | 17 + 81 | > 引用 |
| CTRL + O    | 17 + 79 | 1. 有序列表 |
| CTRL + L    | 17 + 76 | [链接]\(\) |
| CTRL + ALT + S    | 17 + 18 + 83 | ^上角标^ |
| CTRL + ALT + U    | 17 + 18 + 85 | - 无序列表 |
| CTRL + ALT + C    | 17 + 18 + 67 | ``` 代码块 |
| CTRL + ALT + L    | 17 + 18 + 76 | \![图片链接]\(\) |
| CTRL + ALT + T    | 17 + 18 + 84 | 表格 |
| CTRL + SHIFT + S    | 17 + 16 + 83 | ~下角标~ |
| CTRL + SHIFT + D    | 17 + 16 + 68 | ~~中划线~~ |
| CTRL + SHIFT + C    | 17 + 16 + 67 | 居中 |
| CTRL + SHIFT + L    | 17 + 16 + 76 | 居左 |
| CTRL + SHIFT + R    | 17 + 16 + 82 | 居右 |
| SHIFT + TAB    | 16 + 9 | 取消缩进 |

### 图片上传
```html
<template>
  <f-editor @imgAdd="handleImgAdd" v-model="content"></f-editor>
</template>
<script>
  export default {
    data() {
      return {
        content: ''
      }
    },
    methods: {
      handleImgAdd(pos, file, vm) {
        vm.$img2Url(pos, file.miniurl) // 直接上传base64
      }
    }
  }
</script>
```


## 常见问题
1. 图片上传问题
  如果要使用图片功能，必须要处理`imgAdd`事件，在获取到图片url时，要调用`vm.$img2Url(pos, url)`将图片地址插入文档中。
2. 目录中文
   要在目录中使用中文，并想作为hash跳转，可使用以下方法
   ```html
   <template>
     <f-editor :toc-option="tocOption"></f-editor>
   </template>
   <script>
     // 需要先安装uslug依赖
     import uslug from 'uslug'
      export default{
        data() {
          return {
            tocOption: {
              slugify: uslug
            },
          }
        }
      }
   </script>
   ```
3. hash跳转触发vue路由切换动画
    可以设置`forbiddenHash`为`true`，原理是使用[scrollIntoView](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)
4. 获取文档目录，请监听`toc`事件

## Markdown 语法拓展

- [ftoc](https://github.com/fchengjin/markdown-it-ftoc)
- [emoji](https://github.com/markdown-it/markdown-it-emoji)
- [subscript](https://github.com/markdown-it/markdown-it-sub)
- [superscript](https://github.com/markdown-it/markdown-it-sup)
- [container](https://github.com/markdown-it/markdown-it-container)
- [definition list](https://github.com/markdown-it/markdown-it-deflist)
- [abbreviation](https://github.com/markdown-it/markdown-it-abbr)
- [footnote](https://github.com/markdown-it/markdown-it-footnote)
- [insert](https://github.com/markdown-it/markdown-it-ins)
- [mark](https://github.com/markdown-it/markdown-it-mark)
- [todo list](https://github.com/revin/markdown-it-task-lists)
- [highlight](https://github.com/isagalaev/highlight.js)
- [katex](https://github.com/Khan/KaTeX)
- [images preview](https://github.com/CHENXCHEN/markdown-it-images-preview)