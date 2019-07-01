
function $toolbar_right_html_click ($vm) {
  $vm.sHtmlCode = !$vm.sHtmlCode
  if ($vm.htmlcode) {
    $vm.htmlcode($vm.sHtmlCode, $vm.dValue)
  }
}

function $toolbar_right_help_click ($vm) {
  $vm.sHelp = !$vm.sHelp
  if ($vm.helptoggle) {
    $vm.helptoggle($vm.sHelp, $vm.dValue)
  }
}

function $toolbar_right_read_click ($vm) {
  let element = $vm.$refs.vReadModel
  if (!$vm.sReadModel) {
    element.requestFullscreen()
  } else {
    element.exitFullscreen()
  }
}

function $toolbar_right_preview_click ($vm) {
  $vm.sPreviewSwitch = !$vm.sPreviewSwitch
  if ($vm.previewtoggle) {
    $vm.previewtoggle($vm.sPreviewSwitch, $vm.dValue)
  }
}

function $toolbar_right_fullscreen_click ($vm) {
  $vm.sFullScreen = !$vm.sFullScreen
  if ($vm.fullscreen) {
    $vm.fullscreen($vm.sFullScreen, $vm.dValue)
  }
}
function $toolbar_right_subfield_click ($vm) {
  $vm.sSubfield = !$vm.sSubfield
  $vm.sPreviewSwitch = $vm.sSubfield
  if ($vm.previewtoggle) {
    $vm.previewtoggle($vm.sPreviewSwitch, $vm.dValue)
  }
  if ($vm.subfieldtoggle) {
    $vm.subfieldtoggle($vm.sSubfield, $vm.dValue)
  }
}
function $toolbar_right_navigation_click ($vm) {
  $vm.sNavigation = !$vm.sNavigation
  if ($vm.sNavigation) {
    $vm.sPreviewSwitch = true
  }
  if ($vm.navigationtoggle) {
    $vm.navigationtoggle($vm.sNavigation, $vm.dValue)
  }
}
export const toolbar_right_click = (_type, $vm) => {
  const _other_right_click = {
    help: $toolbar_right_help_click,
    html: $toolbar_right_html_click,
    read: $toolbar_right_read_click,
    preview: $toolbar_right_preview_click,
    fullscreen: $toolbar_right_fullscreen_click,
    navigation: $toolbar_right_navigation_click,
    subfield: $toolbar_right_subfield_click
  }
  if (_other_right_click.hasOwnProperty(_type)) {
    _other_right_click[_type]($vm)
  }
}
