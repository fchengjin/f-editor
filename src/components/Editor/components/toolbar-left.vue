<template>
  <div class="v-left-item">
    <slot name="left-toolbar-before"/>
    <button
      v-if="toolbars.bold"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-bold"
      aria-hidden="true"
      :title="`${dWords.tl_bold} (ctrl+b)`"
      @click="$clicks('bold')"
    />
    <button
      v-if="toolbars.italic"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-italic"
      aria-hidden="true"
      :title="`${dWords.tl_italic} (ctrl+i)`"
      @click="$clicks('italic')"
    />
    <div
      v-if="toolbars.header"
      :class="{'selected': sHeaderDropdownOpen}"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-header dropdown dropdown-wrapper"
      aria-hidden="true"
      :title="`${dWords.tl_header} (ctrl+h)`"
      @mouseleave="$mouseleaveHeaderDropdown"
      @mouseenter="$mouseenterHeaderDropdown"
    >
      <transition name="fade">
        <div
          v-show="sHeaderDropdownOpen"
          class="op-header popup-dropdown"
          @mouseenter="$mouseenterHeaderDropdown"
          @mouseleave="$mouseleaveHeaderDropdown"
        >
          <div title="#" class="dropdown-item" @click.stop="$clickHeader('header1')">
            <span>{{ dWords.tl_header_one }}</span>
          </div>
          <div title="## " class="dropdown-item" @click.stop="$clickHeader('header2')">
            <span>{{ dWords.tl_header_two }}</span>
          </div>
          <div title="### " class="dropdown-item" @click.stop="$clickHeader('header3')">
            <span>{{ dWords.tl_header_three }}</span>
          </div>
          <div title="#### " class="dropdown-item" @click.stop="$clickHeader('header4')">
            <span>{{ dWords.tl_header_four }}</span>
          </div>
          <div title="##### " class="dropdown-item" @click.stop="$clickHeader('header5')">
            <span>{{ dWords.tl_header_five }}</span>
          </div>
          <div title="###### " class="dropdown-item" @click.stop="$clickHeader('header6')">
            <span>{{ dWords.tl_header_six }}</span>
          </div>
        </div>
      </transition>
    </div>
    <span v-if="toolbars.header || toolbars.italic || toolbars.bold" class="op-icon-divider"/>
    <button
      v-if="toolbars.underline"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-underline"
      :title="`${dWords.tl_underline} (ctrl+u)`"
      aria-hidden="true"
      @click="$clicks('underline')"
    />
    <button
      v-if="toolbars.strikethrough"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-strikethrough"
      :title="`${dWords.tl_strikethrough} (ctrl+shift+d)`"
      aria-hidden="true"
      @click="$clicks('strikethrough')"
    />
    <button
      v-if="toolbars.mark"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-thumb-tack"
      :title="`${dWords.tl_mark} (ctrl+m)`"
      aria-hidden="true"
      @click="$clicks('mark')"
    />
    <button
      v-if="toolbars.superscript"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-superscript"
      aria-hidden="true"
      :title="`${dWords.tl_superscript} (ctrl+alt+s)`"
      @click="$clicks('superscript')"
    />
    <button
      v-if="toolbars.subscript"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-subscript"
      aria-hidden="true"
      :title="`${dWords.tl_subscript} (ctrl+shift+s)`"
      @click="$clicks('subscript')"
    />
    <button
      v-if="toolbars.alignleft"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-align-left"
      aria-hidden="true"
      :title="`${dWords.tl_alignleft} (ctrl+l)`"
      @click="$clicks('alignleft')"
    />
    <button
      v-if="toolbars.aligncenter"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-align-center"
      aria-hidden="true"
      :title="`${dWords.tl_aligncenter} (ctrl+e)`"
      @click="$clicks('aligncenter')"
    />
    <button
      v-if="toolbars.alignright"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-align-right"
      aria-hidden="true"
      :title="`${dWords.tl_alignright} (ctrl+r)`"
      @click="$clicks('alignright')"
    />
    <span
      v-if="toolbars.superscript || toolbars.subscript || toolbars.underline || toolbars.strikethrough || toolbars.mark"
      class="op-icon-divider"
    />
    <button
      v-if="toolbars.quote"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-quote-left"
      aria-hidden="true"
      :title="`${dWords.tl_quote} (ctrl+q)`"
      @click="$clicks('quote')"
    />
    <button
      v-if="toolbars.ol"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-list-ol"
      aria-hidden="true"
      :title="`${dWords.tl_ol} (ctrl+o)`"
      @click="$clicks('ol')"
    />
    <button
      v-if="toolbars.ul"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-list-ul"
      aria-hidden="true"
      :title="`${dWords.tl_ul} (ctrl+alt+u)`"
      @click="$clicks('ul')"
    />
    <span v-if="toolbars.ul || toolbars.ol || toolbars.quote" class="op-icon-divider"/>
    <button
      v-if="toolbars.link"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-link"
      aria-hidden="true"
      :title="`${dWords.tl_link} (ctrl+l)`"
      @click.stop="$toggleImgLinkAdd('link')"
    />
    <div
      v-if="toolbars.imagelink"
      :disabled="!editable"
      :class="{'selected': sImgDropdownOpen}"
      type="button"
      class="op-icon fa fa-mavon-picture-o dropdown dropdown-wrapper"
      aria-hidden="true"
      @mouseleave="$mouseleaveImgDropdown"
      @mouseenter="$mouseenterImgDropdown"
    >
      <transition name="fade">
        <div
          v-show="sImgDropdownOpen"
          class="op-image popup-dropdown"
          @mouseleave="$mouseleaveImgDropdown"
          @mouseenter="$mouseenterImgDropdown"
        >
          <div class="dropdown-item" @click.stop="$toggleImgLinkAdd('imagelink')">
            <span>{{ dWords.tl_image }}</span>
          </div>
          <div class="dropdown-item" style="overflow: hidden">
            <input
            type="file"
            class="input"
            accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
            multiple="multiple"
            @change="$imgAdd($event)"
            >{{ dWords.tl_upload }}</div>
        </div>
      </transition>
    </div>
    <button
      v-if="toolbars.code"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-code"
      aria-hidden="true"
      :title="`${dWords.tl_code} (ctrl+alt+c)`"
      @click="$clicks('code')"
    />
    <button
      v-if="toolbars.table"
      :disabled="!editable"
      type="button"
      class="op-icon fa fa-mavon-table"
      aria-hidden="true"
      :title="`${dWords.tl_table} (ctrl+alt+t)`"
      @click="$clicks('table')"
    />
    <span
      v-if="toolbars.link || toolbars.imagelink || toolbars.code || toolbars.table"
      class="op-icon-divider"
    />
    <button
      v-if="toolbars.undo"
      type="button"
      class="op-icon fa fa-mavon-undo"
      aria-hidden="true"
      :title="`${dWords.tl_undo} (ctrl+z)`"
      @click="$clicks('undo')"
    />
    <button
      v-if="toolbars.redo"
      type="button"
      class="op-icon fa fa-mavon-repeat"
      aria-hidden="true"
      :title="`${dWords.tl_redo} (ctrl+y)`"
      @click="$clicks('redo')"
    />
    <button
      v-if="toolbars.trash"
      type="button"
      class="op-icon fa fa-mavon-trash-o"
      aria-hidden="true"
      :title="`${dWords.tl_trash} (ctrl+breakspace)`"
      @click="$clicks('trash')"
    />
    <button
      v-if="toolbars.save"
      type="button"
      class="op-icon fa fa-mavon-floppy-o"
      aria-hidden="true"
      :title="`${dWords.tl_save} (ctrl+s)`"
      @click="$clicks('save')"
    />
    <slot name="left-toolbar-after"/>

    <!-- 添加image链接 -->
    <transition name="fade">
      <div v-if="sImgLinkOpen" class="add-image-link-wrapper">
        <div class="add-image-link">
          <i
            class="fa fa-mavon-times"
            aria-hidden="true"
            @click.stop.prevent="sImgLinkOpen = false"
          />
          <h3
            class="title"
          >{{ linkType == 'link' ? dWords.tl_popup_link_title : dWords.tl_popup_img_link_title }}</h3>
          <div class="link-text input-wrapper">
            <input
              ref="linkTextInput"
              v-model="linkText"
              type="text"
              :placeholder="linkType == 'link' ? dWords.tl_popup_link_text : dWords.tl_popup_img_link_text"
            >
          </div>
          <div class="link-addr input-wrapper">
            <input
              v-model="linkAddr"
              type="text"
              :placeholder="linkType == 'link' ? dWords.tl_popup_link_addr : dWords.tl_popup_img_link_addr"
            >
          </div>
          <button
            class="op-btn cancel"
            @click.stop.prevent="sImgLinkOpen = false"
          >{{ dWords.tl_popup_link_cancel }}</button>
          <button
            class="op-btn sure"
            @click.stop.prevent="$imgLinkAdd()"
          >{{ dWords.tl_popup_link_sure }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'ToolbarLeft',
  props: {
    // 是否开启编辑
    editable: {
      type: Boolean,
      default: true
    },
    // 工具栏
    toolbars: {
      type: Object,
      required: true
    },
    dWords: {
      type: Object,
      required: true
    },
    imageFilter: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      imgTimer: null,
      headerTimer: null,
      sImgDropdownOpen: false,
      sHeaderDropdownOpen: false,
      sImgLinkOpen: false,
      trigger: null,
      num: 0,
      linkText: '',
      linkAddr: '',
      linkType: 'link'
    }
  },
  methods: {
    $imgLinkAdd () {
      this.$emit(
        'toolbar_left_addlink',
        this.linkType,
        this.linkText,
        this.linkAddr
      )
      this.sImgLinkOpen = false
    },
    $toggleImgLinkAdd (type) {
      this.linkType = type
      this.linkText = this.linkAddr = ''
      this.sImgLinkOpen = true
      this.$nextTick(() => {
        this.$refs.linkTextInput.focus()
      })
      this.sImgDropdownOpen = false
    },
    $imgFileAdd ($file) {
      this.$emit('imgAdd', this.num, $file)
      this.sImgDropdownOpen = false
    },
    $imgFilesAdd ($files) {
      // valid means if the imageFilter exist.
      const valid = typeof this.imageFilter === 'function'
      for (let i = 0; i < $files.length; i++) {
        if (valid && this.imageFilter($files[i]) === true) {
          this.$imgFileAdd($files[i])
        } else if (!valid && $files[i].type.match(/^image\//i)) {
          this.$imgFileAdd($files[i])
        }
      }
    },
    $imgAdd ($e) {
      this.$imgFilesAdd($e.target.files)
      $e.target.value = '' // 初始化
    },
    // 工具栏功能图标click-----------------
    $mouseenterImgDropdown () {
      if (this.editable) {
        clearTimeout(this.imgTimer)
        this.sImgDropdownOpen = true
      }
    },
    $mouseleaveImgDropdown () {
      const vm = this
      this.imgTimer = setTimeout(function () {
        vm.sImgDropdownOpen = false
      }, 200)
    },
    $mouseenterHeaderDropdown () {
      if (this.editable) {
        clearTimeout(this.headerTimer)
        this.sHeaderDropdownOpen = true
      }
    },
    $mouseleaveHeaderDropdown () {
      const vm = this
      this.headerTimer = setTimeout(function () {
        vm.sHeaderDropdownOpen = false
      }, 200)
    },
    $clicks (_type) {
      // 让父节点来绑定事件并
      if (this.editable) {
        this.$emit('toolbar_left_click', _type)
      }
    },
    $clickHeader (_type) {
      // 让父节点来绑定事件并
      this.$emit('toolbar_left_click', _type)
      this.sHeaderDropdownOpen = false
    },
    handleClose () {
      this.sImgDropdownOpen = false
    }
  }
}
</script>
<style lang="scss" scoped>
.op-icon.dropdown-wrapper.dropdown {
  position: relative;
  .popup-dropdown {
    position: absolute;
    display: block;
    background: #fff;
    top: 32px;
    left: -45px;
    min-width: 130px;
    z-index: 1600;
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.156863),
      0 0px 4px rgba(0, 0, 0, 0.227451);
    transition: all 0.2s linear 0s;
    &.op-header {
      left: -30px;
      min-width: 90px;
    }
    &.fade-enter-active,
    &.fade-leave-active {
      opacity: 1;
    }
    &.fade-enter,
    &.fade-leave-active {
      opacity: 0;
    }
  }
  .dropdown-item {
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    transition: all 0.2s linear 0s;
    position: relative;
    &:hover {
      background: #eaeaea;
    }
    input {
      position: absolute;
      font-size: 0;
      right: 0;
      top: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  .dropdown-images {
    box-sizing: border-box;
    button {
      position: absolute;
      right: 5px;
      &:hover {
        color: #db2828;
      }
    }
    span {
      display: inline-block;
      width: 80px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:hover {
      .image-show {
        display: block !important;
      }
    }
    .image-show {
      display: none;
      position: absolute;
      left: -122px;
      top: 0;
      transition: all 0.3s linear 0s;
      width: 120px;
      height: 90px;
      border: 1px solid #eeece8;
    }
  }
}

.add-image-link-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1600;
  padding: 16px;
  transition: all 0.1s linear 0s;
  &.fade-enter-active,
  &.fade-leave-active {
    opacity: 1;
  }
  &.fade-enter,
  &.fade-leave-active {
    opacity: 0;
  }
  .add-image-link {
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    height: auto;
    padding: 20px;
    top: 25%;
    max-width: 400px;
    transition: all 0.1s linear 0s;
    z-index: 3;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0px 5px rgba(255, 255, 255, 0.156863),
      0 0px 5px rgba(255, 255, 255, 0.227451);
    i {
      font-size: 24px;
      position: absolute;
      right: 8px;
      top: 6px;
      color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
    }
    .title {
      font-size: 20px;
      margin-bottom: 30px;
      margin-top: 10px;
      font-weight: 500 !important;
    }
    .input-wrapper {
      width: 80%;
      border: 1px solid #eeece8;
      text-align: left;
      margin: 10px auto 0;
      height: 35px;
      input {
        height: 32px;
        line-height: 32px;
        font-size: 15px;
        width: 90%;
        margin-left: 8px;
        border: none;
        outline: none;
      }
    }

    .op-btn {
      line-height: 2;
      padding: 5px 30px;
      display: inline-block;
      margin-top: 30px;
      cursor: pointer;
      text-align: center;
      opacity: 0.9;
      border-radius: 2px;
      letter-spacing: 1px;
      font-size: 14px;
    }
    .op-btn.sure {
      background: #2185d0;
      color: #fff;
      margin-left: 5%;
      &:hover {
        opacity: 1;
      }
    }
    .op-btn.cancel {
      border: 1px solid #bcbcbc;
      color: #bcbcbc;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
