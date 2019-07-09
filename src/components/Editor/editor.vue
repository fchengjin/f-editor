 <!-- eslint-disable vue/no-v-html -->
<template>
  <div :class="[{'fullscreen': sFullScreen}]" class="v-note-wrapper">
    <!--工具栏-->
    <div v-show="toolbarsFlag" class="v-note-op" :class="{'shadow': boxShadow}">
      <toolbar-left
        ref="toolbar_left"
        :editable="editable"
        :d-words="dWords"
        :toolbars="bar"
        :image_filter="imageFilter"
        @toolbar_left_click="toolbar_left_click"
        @toolbar_left_addlink="toolbar_left_addlink"
        @imgAdd="$imgAdd"
      >
        <slot slot="left-toolbar-before" name="left-toolbar-before"/>
        <slot slot="left-toolbar-after" name="left-toolbar-after"/>
      </toolbar-left>
      <toolbar-right
        ref="toolbar_right"
        :d-words="dWords"
        :toolbars="bar"
        :s-subfield="sSubfield"
        :s-preview-switch="sPreviewSwitch"
        :s-full-screen="sFullScreen"
        :s-html-code="sHtmlCode"
        :s-navigation="sNavigation"
        @toolbar_right_click="toolbar_right_click"
      >
        <slot slot="right-toolbar-before" name="right-toolbar-before"/>
        <slot slot="right-toolbar-after" name="right-toolbar-after"/>
      </toolbar-right>
    </div>
    <!--编辑展示区域-->
    <div class="v-note-panel" :class="{'shadow': boxShadow}">
      <!--编辑区-->
      <div
        ref="vNoteEdit"
        class="v-note-edit divarea-wrapper"
        :class="{'scroll-style': sScrollStyle, 'single-edit': !sPreviewSwitch && !sHtmlCode , 'single-show': (!sSubfield && sPreviewSwitch) || (!sSubfield && sHtmlCode)}"
        @scroll="$v_edit_scroll"
        @click="textAreaFocus"
      >
        <div class="content-input-wrapper">
          <!-- 双栏 -->
          <auto-textarea
            ref="vNoteTextarea"
            v-model="dValue"
            :placeholder="placeholder ? placeholder : dWords.start_editor"
            class="content-input"
            :font-size="fontSize"
            :max-length="maxLength"
            line-height="1.5"
            full-height
            auto-focus
          />
        </div>
      </div>
      <!--展示区-->
      <div
        v-show="sPreviewSwitch || sHtmlCode"
        :class="{'single-show': (!sSubfield && sPreviewSwitch) || (!sSubfield && sHtmlCode)}"
        class="v-note-show"
      >
        <render
          v-show="!sHtmlCode"
          ref="vShowContent"
          :class="{'scroll-style': sScrollStyle}"
          class="v-show-content"
          :value="dValue"
          :external-link="externalLink"
          :toc-option="tocOption"
          :forbidden-hash="forbiddenHash"
          @toc="handleToc"
          :ishljs="ishljs"
          @render="handleRender"
          :use-toc="useToc"
        />
        <div
          v-show="sHtmlCode"
          :class="{'scroll-style': sScrollStyle}"
          class="v-show-content-html"
        >{{ dRender }}</div>
      </div>

      <!--标题导航-->
      <transition name="slideTop">
        <div v-show="sNavigation" class="v-note-navigation-wrapper" :class="{'shadow': boxShadow}">
          <div class="v-note-navigation-title" :class="{'shadow': boxShadow}">
            {{ dWords.navigation_title }}
            <i
              class="fa fa-mavon-times v-note-navigation-close"
              aria-hidden="true"
              @click="toolbar_right_click('navigation')"
            />
          </div>
          <div
            ref="navigationContent"
            class="v-note-navigation-content scroll-style markdown-body"
            v-html="toc"
          />
        </div>
      </transition>
    </div>
    <!--帮助文档-->
    <transition name="fade">
      <div ref="help">
        <div v-if="sHelp" class="v-note-help-wrapper" @click="toolbar_right_click('help')">
          <div class="v-note-help-content" :class="{'shadow': boxShadow}">
            <i
              class="fa fa-mavon-times"
              aria-hidden="true"
              @click.stop.prevent="toolbar_right_click('help')"
            />
            <render
              class="scroll-style v-note-help-show"
              :value="dHelp"
              :external-link="externalLink"
            />
          </div>
        </div>
      </div>
    </transition>
    <div v-if="loading" class="loading">
      <img :src="loadingSvg" style="width: 100px; height: 100px; background: transparent;">
    </div>
    <div :class="{'show': sReadModel}" class="v-note-read-model scroll-style" ref="vReadModel">
      <div ref="vNoteReadContent" class="v-note-read-content markdown-body" v-html="dRender"></div>
    </div>
    <!-- 剩余字数 -->
    <div class="remaining" v-if="maxLength">
      <p>{{dWords.limit}} {{maxLength}} {{dWords.character}}, {{dWords.canInput}} <span  :class="{warning: remainingWarn}">{{maxLength - dValue.length}}</span> {{dWords.character}}</p>
    </div>
  </div>
</template>

<script>
import Render from './render'
import loadingSvg from './loading.svg'
import autoTextarea from './components/auto-textarea'
import { keydownListen } from './lib/core/keydown-listen.js'
import {
  /* windowResize, */
  fullscreenchange,
  scrollLink,
  insertTextAtCaret,
  insertTab,
  unInsertTab,
  insertOl,
  insertUl,
  insertEnter,
  removeLine
} from './lib/core/extra-function.js'
import { stopEvent } from './lib/util.js'
import {
  toolbar_left_click,
  toolbar_left_addlink
} from './lib/toolbarLeftClick.js'
import { toolbar_right_click } from './lib/toolbarRightClick.js'
import { CONFIG } from './lib/config.js'
import ToolbarLeft from './components/toolbar-left'
import ToolbarRight from './components/toolbar-right'
import './lib/font/css/fontello.css'
export default {
  components: {
    autoTextarea,
    ToolbarLeft,
    ToolbarRight,
    Render
  },
  props: {
    // 是否渲染滚动条样式(webkit)
    scrollStyle: {
      type: Boolean,
      default: true
    },
    useToc: {
      type: Boolean,
      default: true
    },
    ishljs: {
      type: Boolean,
      default: true
    },
    tocOption: {
      type: Object,
      default () {
        return {}
      }
    },
    maxLength: {
      type: [Number, null],
      default: null
    },
    boxShadow: {
      type: Boolean,
      default: true
    },
    autofocus: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    // 初始value
    value: {
      type: String,
      default: ''
    },
    // 初始value
    language: {
      type: String,
      default: 'zh-CN'
    },
    subfield: {
      type: Boolean,
      default: true
    },
    navigation: {
      type: Boolean,
      default: false
    },
    defaultOpen: {
      type: String,
      default: null
    },
    // 是否开启编辑
    editable: {
      type: Boolean,
      default: true
    },
    // 是否开启工具栏
    toolbarsFlag: {
      type: Boolean,
      default: true
    },
    // 工具栏
    toolbars: {
      type: Object,
      default () {
        return CONFIG.toolbars
      }
    },
    // 小屏幕时的toolbars
    sToolbars: {
      type: Object,
      default () {
        return {
          underline: true,
          strikethrough: true,
          imagelink: true,
          table: true,
          undo: true,
          save: true,
          preview: true,
          navigation: true
        }
      }
    },
    placeholder: {
      type: String,
      default: null
    },
    externalLink: {
      type: [Object, Boolean],
      default: true
    },
    imageFilter: {
      type: Function,
      default: null
    },
    imageClick: {
      type: Function,
      default: null
    },
    tabSize: {
      type: Number,
      default: 0
    },
    shortCut: {
      type: Boolean,
      default: true
    },
    forbiddenHash: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      loadingSvg,
      sRightClickMenuShow: false,
      rightClickMenuTop: 0,
      rightClickMenuLeft: 0,
      sSubfield: (() => {
        return this.subfield
      })(),
      dRender: '',
      sAutofocus: true,
      // 标题导航
      sNavigation: (() => {
        return this.navigation
      })(),
      sScrollStyle: (() => {
        return this.scrollStyle
      })(), // props 是否渲染滚动条样式
      dValue: '', // props 文本内容
      sPreviewSwitch: (() => {
        let opened = this.defaultOpen
        if (!opened) {
          opened = this.subfield ? 'preview' : 'edit'
        }
        return opened === 'preview'
      })(), // props true 展示编辑 false展示预览
      sFullScreen: false, // 全屏编辑标志
      sHelp: false, // markdown帮助
      sHtmlCode: false, // 分栏情况下查看html
      dHelp: null,
      dWords: null,
      sReadModel: false,
      dHistory: (() => {
        const tempArray = []
        tempArray.push(this.value)
        return tempArray
      })(), // 编辑记录
      dHistoryIndex: 0, // 编辑记录索引
      currentTimeout: '',
      dImageFile: [],
      toc: '',
      smallScreen: false,
      remainingWarn: false // 剩余字数警告
    }
  },
  watch: {
    dValue (val) {
      this.$emit('input', val)
      // 处理长度限制
      if (this.maxLength && val.length >= (this.maxLength - 10)) {
        this.remainingWarn = true
      } else {
        this.remainingWarn = false
      }
      // 塞入编辑记录数组
      if (this.dValue === this.dHistory[this.dHistoryIndex]) return
      clearTimeout(this.currentTimeout)
      this.currentTimeout = setTimeout(() => {
        this.saveHistory()
      }, 500)
    },
    value (val) {
      if (val !== this.dValue) {
        this.dValue = val
      }
    },
    subfield (val) {
      this.sSubfield = val
    },
    dHistoryIndex () {
      if (this.dHistoryIndex > 20) {
        this.dHistory.shift()
        this.dHistoryIndex = this.dHistoryIndex - 1
      }
      this.dValue = this.dHistory[this.dHistoryIndex]
    },
    language () {
      this.initLanguage()
    },
    editable () {
      this.editableTextarea()
    },
    defaultOpen (val) {
      let opened = val
      if (!opened) {
        opened = this.subfield ? 'preview' : 'edit'
      }
      this.sPreviewSwitch = opened === 'preview'
      return this.sPreviewSwitch
    }
  },
  computed: {
    bar () {
      return this.smallScreen ? this.sToolbars : this.toolbars
    }
  },
  created () {
    // 初始化语言
    this.initLanguage()
  },
  mounted () {
    const $vm = this
    this.$el.addEventListener('paste', function (e) {
      $vm.$paste(e)
    })
    this.$el.addEventListener('drop', function (e) {
      $vm.$drag(e)
    })
    // 处理浏览器resize事件
    this.handleResize()
    window.addEventListener('resize', this.handleResize)

    fullscreenchange(this.$el, () => {
      this.sReadModel = !this.sReadModel
      this.readmodel(this.sReadModel, this.dValue)
    })

    keydownListen(this)
    // 图片预览事件监听
    // 设置默认焦点
    if (this.autofocus) {
      this.textAreaFocus()
    }
    this.$nextTick(() => {
      // 初始化Textarea编辑开关
      this.editableTextarea()
    })
    this.dValue = this.value
    // 将help添加到末尾
    document.body.appendChild(this.$refs.help)

    // 导航目录
    if (this.$refs.navigationContent) {
      this.$refs.navigationContent.addEventListener('click', event => {
        event = event || window.event
        const ele = event.srcElement ? event.srcElement : event.target
        if (ele.tagName === 'A') {
          const href = ele.getAttribute('href')
          if (href.startsWith('#')) {
            event.preventDefault()
            const anchor = document.querySelector(href)
            anchor &&
              anchor.scrollIntoView({
                behavior: 'smooth'
              })
          }
        }
      })
    }
  },
  beforeDestroy () {
    document.body.removeChild(this.$refs.help)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      if (this.$el.clientWidth < 768) {
        this.sSubfield = false
        this.smallScreen = true
      } else {
        this.smallScreen = false
        this.sSubfield = this.subfield
      }
    },
    handleRender (val) {
      this.dRender = val
      this.$emit('render', val)
    },
    handleToc (tocHtml) {
      this.toc = tocHtml
      this.$emit('toc', tocHtml)
    },
    textAreaFocus () {
      this.getTextareaDom().focus()
    },
    $drag ($e) {
      const dataTransfer = $e.dataTransfer
      if (dataTransfer) {
        const files = dataTransfer.files
        if (files.length > 0) {
          $e.preventDefault()
          this.$refs.toolbar_left.$imgFilesAdd(files)
        }
      }
    },
    $paste ($e) {
      const clipboardData = $e.clipboardData
      if (clipboardData) {
        const items = clipboardData.items
        if (!items) return
        const types = clipboardData.types || []
        let item = null
        for (let i = 0; i < types.length; i++) {
          if (types[i] === 'Files') {
            item = items[i]
            break
          }
        }
        if (item && item.kind === 'file') {
          // prevent filename being pasted parallel along
          // with the image pasting process
          stopEvent($e)
          const oFile = item.getAsFile()
          this.$refs.toolbar_left.$imgFilesAdd([oFile])
        }
      }
    },
    $imgAdd (pos, $file, isinsert = true) {
      const $vm = this
      if (this.__rFilter == null) {
        // this.__rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        this.__rFilter = /^image\//i
      }
      this.__oFReader = new FileReader()
      this.__oFReader.onload = function (oFREvent) {
        $vm.$refs.vShowContent.markdownIt.image_add(pos, oFREvent.target.result)
        $file.miniurl = oFREvent.target.result
        if (isinsert) {
          // 去除特殊字符
          $file._name = $file.name.replace(/[[\]()+{}&|\\*^%$#@-]/g, '')

          $vm.insertText($vm.getTextareaDom(), {
            prefix: '![' + $file._name + '](' + pos + ')',
            subfix: '',
            str: ''
          })
          $vm.$nextTick(function () {
            $vm.$emit('imgAdd', pos, $file, this)
          })
        }
      }
      if ($file) {
        const oFile = $file
        if (this.__rFilter.test(oFile.type)) {
          this.__oFReader.readAsDataURL(oFile)
        }
      }
    },
    $imgAddByUrl (pos, url) {
      if (this.$refs.toolbar_left.$imgAddByUrl(pos, url)) {
        this.$imgUpdateByUrl(pos, url)
        return true
      }
      return false
    },
    $img2Url (fileIndex, url) {
      // x.replace(/(\[[^\[]*?\](?=\())\(\s*(\.\/2)\s*\)/g, "$1(http://path/to/png.png)")
      const regStr =
        '(!\\[[^\\[]*?\\](?=\\())\\(\\s*(' + fileIndex + ')\\s*\\)'
      const reg = new RegExp(regStr, 'g')
      this.dValue = this.dValue.replace(reg, '$1(' + url + ')')
    },
    $imglst2Url (imglst) {
      if (imglst instanceof Array) {
        for (let i = 0; i < imglst.length; i++) {
          this.$img2Url(imglst[i][0], imglst[i][1])
        }
      }
    },
    toolbar_left_click (_type) {
      toolbar_left_click(_type, this)
    },
    toolbar_left_addlink (_type, text, link) {
      toolbar_left_addlink(_type, text, link, this)
    },
    toolbar_right_click (_type) {
      toolbar_right_click(_type, this)
    },
    // @event
    // 切换全屏触发 （status , val）
    fullscreen (status, val) {
      this.$emit('fullScreen', status, val)
    },
    // 打开阅读模式触发（status , val）
    readmodel (status, val) {
      this.$emit('readModel', status, val)
    },
    // 切换阅读编辑触发 （status , val）
    previewtoggle (status, val) {
      this.$emit('previewToggle', status, val)
    },
    // 切换分栏触发 （status , val）
    subfieldtoggle (status, val) {
      this.$emit('subfieldToggle', status, val)
    },
    // 切换htmlcode触发 （status , val）
    htmlcode (status, val) {
      this.$emit('htmlCode', status, val)
    },
    // 打开 , 关闭 help触发 （status , val）
    helptoggle (status, val) {
      this.$emit('helpToggle', status, val)
    },
    // 监听ctrl + s
    save (val, render) {
      this.$emit('save', val, render)
    },
    // 导航栏切换
    navigationtoggle (status, val) {
      this.$emit('navigationToggle', status, val)
    },
    // ---------------------------------------
    // 滚动条联动
    $v_edit_scroll ($event) {
      scrollLink($event, this)
    },
    // 获取textarea dom节点
    getTextareaDom () {
      return this.$refs.vNoteTextarea.$refs.vTextarea
    },
    // 工具栏插入内容
    insertText (obj, { prefix, subfix, str, type }) {
      // if (this.sPreviewSwitch) {

      insertTextAtCaret(obj, { prefix, subfix, str, type }, this)
    },
    insertTab () {
      insertTab(this, this.tabSize)
    },
    insertOl () {
      insertOl(this)
    },
    removeLine () {
      removeLine(this)
    },
    insertUl () {
      insertUl(this)
    },
    unInsertTab () {
      unInsertTab(this, this.tabSize)
    },
    insertEnter (event) {
      insertEnter(this, event)
    },
    saveHistory () {
      this.dHistory.splice(this.dHistoryIndex + 1, this.dHistory.length)
      this.dHistory.push(this.dValue)
      this.dHistoryIndex = this.dHistory.length - 1
    },
    initLanguage () {
      const lang =
        CONFIG.langList.indexOf(this.language) >= 0 ? this.language : 'zh-CN'
      this.dHelp = CONFIG[`help_${lang}`]
      this.dWords = CONFIG[`words_${lang}`]
    },
    // 编辑开关
    editableTextarea () {
      const textDom = this.getTextareaDom()
      if (this.editable) {
        textDom.removeAttribute('disabled')
      } else {
        textDom.setAttribute('disabled', 'disabled')
      }
    },
    // 清空上一步 下一步缓存
    $emptyHistory () {
      this.dHistory = [this.dValue] // 编辑记录
      this.dHistoryIndex = 0 // 编辑记录索引
    }
  }
}
</script>
<style scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
