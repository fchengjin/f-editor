<template>
  <div class="v-right-item">
    <slot name="right-toolbar-before" />
    <button
      v-if="toolbars.navigation" v-show="!sNavigation" type="button" class="op-icon fa fa-mavon-bars"
      aria-hidden="true"
      :title="`${dWords.tl_navigation_on} (F8)`" @click="$clicks('navigation')"
    />
    <button
      v-if="toolbars.navigation" v-show="sNavigation" type="button" class="op-icon fa fa-mavon-bars selected"
      aria-hidden="true"
      :title="`${dWords.tl_navigation_off} (F8)`" @click="$clicks('navigation')"
    />
    <button
      v-if="toolbars.preview" v-show="sPreviewSwitch" type="button" class="op-icon fa fa-mavon-eye-slash selected"
      aria-hidden="true"
      :title="`${dWords.tl_edit} (F9)`" @click="$clicks('preview')"
    />
    <button
      v-if="toolbars.preview" v-show="!sPreviewSwitch" type="button" class="op-icon fa fa-mavon-eye"
      aria-hidden="true"
      :title="`${dWords.tl_preview} (F9)`" @click="$clicks('preview')"
    />
    <button
      v-if="toolbars.fullscreen" v-show="!sFullScreen" type="button" class="op-icon fa fa-mavon-arrows-alt"
      :title="`${dWords.tl_fullscreen_on} (F10)`"
      aria-hidden="true" @click="$clicks('fullscreen')"
    />
    <button
      v-if="toolbars.fullscreen" v-show="sFullScreen" type="button" class="op-icon fa fa-mavon-compress selected"
      :title="`${dWords.tl_fullscreen_off} (F10)`"
      aria-hidden="true" @click="$clicks('fullscreen')"
    />
    <button
      v-if="toolbars.subfield" type="button" class="op-icon fa fa-mavon-columns" aria-hidden="true" :class="{'selected': sSubfield}"
      :title="`${sSubfield ? dWords.tl_single_column : dWords.tl_double_column} (F12)`" @click="$clicks('subfield')"
    />
    <span
      v-if=" toolbars.help && toolbars.htmlcode && toolbars.fullscreen && toolbars.subfield && toolbars.navigation"
      class="op-icon-divider"
    />
    <button
      v-if="toolbars.htmlcode" v-show="!sHtmlCode" type="button" class="op-icon fa fa-mavon-code" :title="dWords.tl_html_on"
      aria-hidden="true"
      @click="$clicks('html')"
    />
    <button
      v-if="toolbars.htmlcode" v-show="sHtmlCode" type="button" class="op-icon fa fa-mavon-code selected"
      :title="dWords.tl_html_off"
      aria-hidden="true" @click="$clicks('html')"
    />
    <button
      v-if="toolbars.help" type="button" class="op-icon fa fa-mavon-question-circle" style="font-size: 17px;padding: 5px 6px 5px 3px"
      :title="dWords.tl_help"
      aria-hidden="true" @click="$clicks('help')"
    />
    <slot name="right-toolbar-after" />
  </div>
</template>
<script>
export default {
  name: 'ToolbarRight',
  props: {
    // 工具栏
    sSubfield: {
      type: Boolean,
      required: true
    },
    toolbars: { type: Object, required: true },
    sPreviewSwitch: { type: Boolean, required: true },
    sFullScreen: { type: Boolean, required: true },
    sHtmlCode: { type: Boolean, required: true },
    sNavigation: { type: Boolean, required: true },
    dWords: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 工具栏功能图标click-----------------
    $clicks (_type) {
      // 让父节点来绑定事件并
      this.$emit('toolbar_right_click', _type)
    }
  }
}
</script>
