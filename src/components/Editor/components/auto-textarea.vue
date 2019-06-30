<template>
  <div
    :style="{fontSize: fontSize , lineHeight: lineHeight, height: fullHeight ? '100%': 'auto'}"
    class="auto-textarea-wrapper"
  >
    <pre
      :style="{fontSize: fontSize , lineHeight: lineHeight, minHeight: fullHeight ? '100%': 'auto'}"
      class="auto-textarea-block"
    ><br>{{ tempValue }} </pre>
    <textarea
      ref="vTextarea"
      v-model="tempValue"
      :autofocus="sAutofocus"
      spellcheck="false"
      :placeholder="placeholder"
      :style="{fontSize: fontSize , lineHeight: lineHeight}"
      :class="{'no-border': !border , 'no-resize': !resize}"
      class="auto-textarea-input"
      @keyup="change"
    />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    fullHeight: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Boolean,
      default: false
    },
    onchange: {
      type: Function,
      default: null
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    lineHeight: {
      type: String,
      default: '18px'
    }
  },
  data () {
    return {
      tempValue: (() => {
        return this.value
      })(),
      sAutofocus: (() => {
        if (this.autofocus) {
          return 'autofocus'
        }
      })()
    }
  },
  watch: {
    value (val) {
      this.tempValue = val
    },
    tempValue (val) {
      this.$emit('input', val)
    }
  },
  created () {},
  methods: {
    change ($event) {
      if (this.onchange) {
        this.onchange(this.tempValue, $event)
      }
    }
  }
}
</script>
<style lang="scss">
.auto-textarea-wrapper {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  line-height: normal;
  height: 100%;
  .auto-textarea-block {
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word !important;
    visibility: hidden;
    overflow: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 100%;
  }
  .auto-textarea-input {
    font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New",
      "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    overflow-y: hidden;
    color: #2c3e50;
    &.no-border {
      outline: 0 none;
      border: none !important;
    }
    &.no-resize {
      resize: none;
    }
  }
}
</style>
