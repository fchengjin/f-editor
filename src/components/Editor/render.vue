<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="markdown-body" :class="{'scroll-style': scrollStyle}" v-html="mdRender" />
</template>
<script>
import hljs_css from './lib/core/hljs/lang.hljs.css.js'
import {
  loadLink,
  loadScript,
  hijackClickEvent
} from './lib/core/extra-function.js'
import markdown from './lib/mixins/markdown.js'
export default {
  mixins: [ markdown ],
  props: { // 是否渲染滚动条样式(webkit)
    scrollStyle: {
      type: Boolean,
      default: true
    },
    // 初始value
    value: {
      type: String,
      default: ''
    },
    codeStyle: {
      type: String,
      default () {
        return 'github'
      }
    },
    externalLink: {
      type: [ Object, Boolean ],
      default: true
    },
    imageClick: {
      type: Function,
      default: null
    },
    forbiddenHash: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      sExternalLink: {
        markdown_css () {
          return 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css'
        },
        hljs_js () {
          return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'
        },
        hljs_lang (lang) {
          return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/' + lang + '.min.js'
        },
        hljs_css (css) {
          if (hljs_css[css]) {
            return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/' + css + '.min.css'
          }
          return ''
        },
        katex_js () {
          return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js'
        },
        katex_css () {
          return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css'
        }
      },
      p_external_link: {},
      mdRender: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val, oldVal) {
        if (val === oldVal) return
        this.iRender()
      }
    },
    codeStyle (val) {
      this.codeStyleChange(val)
    }
  },
  created () {
    this.initExternalFuc()
  },
  mounted () {
    const $vm = this
    // 图片预览事件监听
    hijackClickEvent(this)
    this.loadExternalLink('markdown_css', 'css')
    this.loadExternalLink('katex_css', 'css')
    this.loadExternalLink('katex_js', 'js', function () {
      $vm.iRender()
    })
    this.loadExternalLink('hljs_js', 'js', function () {
      $vm.iRender()
    })
    if (!(typeof $vm.externalLink === 'object' && typeof $vm.externalLink.markdown_css === 'function')) {
      // 没有外部文件要来接管markdown样式，可以更改markdown样式。
      $vm.codeStyleChange($vm.codeStyle, true)
    }
  },
  methods: {
    handleImgPreview (ele) {
      const img = new Image()
      let cover = document.createElement('div')
      img.classList.add('preview_img')
      cover.classList.add('preview_cover')
      img.src = ele.src
      cover.appendChild(img)
      document.body.appendChild(cover)
      document.body.classList.add('preview')
      cover.addEventListener('click', function (ev) {
        if (ev.target === this) {
          document.body.removeChild(cover)
          document.body.classList.remove('preview')
          cover = null
        }
      })
    },
    loadExternalLink (name, type, callback) {
      if (typeof this.p_external_link[name] !== 'function') {
        if (this.p_external_link[name]) {
          console.error('external_link.' + name, 'is not a function, if you want to disabled this error log, set external_link.' + name, 'to function or false')
        }
        return
      }
      const _obj = {
        css: loadLink,
        js: loadScript
      }
      if (_obj.hasOwnProperty(type)) {
        _obj[type](this.p_external_link[name](), callback)
      }
    },
    initExternalFuc () {
      const $vm = this
      const _external_ = [ 'markdown_css', 'hljs_js', 'hljs_css', 'hljs_lang', 'katex_js', 'katex_css' ]
      const _type_ = typeof $vm.externalLink
      const _is_object = (_type_ === 'object')
      const _is_boolean = (_type_ === 'boolean')
      for (let i = 0; i < _external_.length; i++) {
        if ((_is_boolean && !$vm.externalLink) || (_is_object && $vm.externalLink[_external_[i]] === false)) {
          $vm.p_external_link[_external_[i]] = false
        } else if (_is_object && typeof $vm.externalLink[_external_[i]] === 'function') {
          $vm.p_external_link[_external_[i]] = $vm.externalLink[_external_[i]]
        } else {
          $vm.p_external_link[_external_[i]] = $vm.sExternalLink[_external_[i]]
        }
      }
    },
    // @event
    codeStyleChange (val, isInit) {
      isInit = isInit || false
      if (typeof this.p_external_link.hljs_css !== 'function') {
        if (this.p_external_link.hljs_css) { console.error('external_link.hljs_css is not a function, if you want to disabled this error log, set external_link.hljs_css to function or false') }
        return
      }
      let url = this.p_external_link.hljs_css(val)
      if (url.length === 0 && isInit) {
        console.warn('hljs color scheme', val, 'do not exist, loading default github')
        url = this.p_external_link.hljs_css('github')
      }
      if (url.length > 0) {
        loadLink(url)
      } else {
        console.warn('hljs color scheme', val, 'do not exist, hljs color scheme will not change')
      }
    }
  }
}
</script>
