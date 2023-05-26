/* eslint-disable @titian-design/check-life-items */
import BasicComponent from '../common/basic/BasicComponent';

BasicComponent({
  externalClasses: ['label-class', 'input-class'],
  properties: {
    // input的类型,可选值为 `text` `number` `idcard` `digit `safe-password` `nickname`
    type: {
      type: String,
      value: 'text'
    },

    // 当前输入的值, 支持简易双向绑定model:value
    value: String,

    // 是否是密码类型
    password: Boolean,

    // 输入框为空时占位符
    placeholder: String,

    // 指定 placeholder 的样式
    placeholderStyle: String,

    // 是否禁用
    disabled: Boolean,

    // 底边框分割线
    divider: {
      type: Boolean,
      value: true
    },

    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: Number,
      value: 140
    },

    // 左侧图标名称
    prefixIcon: String,

    // 输入框左侧文本
    label: String,

    // 是否显示必填星号
    required: Boolean,

    // 是否启用清除控件
    clearable: {
      type: Boolean,
      value: true
    },

    // 是否只读
    readOnly: Boolean,

    // 输入框内容对齐方式，可选值为 `left` `right`
    textAlign: {
      type: String,
      value: 'left'
    },

    // 是否将输入内容标红
    error: Boolean,

    // 底部错误提示文案，为空时不展示
    errorMessage: String,

    // 指定光标与键盘的距离，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
    cursorSpacing: {
      type: Number,
      value: 0
    },

    // 获取焦点
    focus: Boolean,

    // #ifdef MP-ALIPAY
    enableNative: Boolean,
    // #endif

    // 设置键盘右下角按钮的文字，仅在type='text'时生效
    confirmType: {
      type: String,
      value: 'done'
    },

    // 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
    alwaysEmbed: Boolean,

    // 点击键盘右下角按钮时是否保持键盘不收起
    confirmHold: Boolean,

    // 指定focus时的光标位置
    cursor: {
      type: Number,
      value: -1
    },

    // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
    selectionStart: {
      type: Number,
      value: -1
    },

    // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
    selectionEnd: {
      type: Number,
      value: -1
    },

    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      value: true
    },

    // focus时，点击页面的时候不收起键盘
    holdKeyboard: Boolean,

    // 安全键盘加密公钥的路径，只支持包内路径
    safePasswordCertPath: String,

    // 安全键盘输入密码长度
    safePasswordLength: Number,

    // 安全键盘加密时间戳
    safePasswordTimeStamp: Number,

    // 安全键盘加密盐值
    safePasswordNonce: String,

    // 安全键盘计算hash盐值，若指定custom-hash 则无效
    safePasswordSalt: String,

    // 安全键盘计算hash的算法表达式，如 `md5(sha1('foo' + sha256(sm3(password + 'bar'))))`
    safePasswordCustomHash: String,

    // 根节点样式
    extStyle: String
  },
  data: {
    errorStyle: '',
    showClearIcon: false
  },
  methods: {
    onInput(event: WechatMiniprogram.Input) {
      this.setData({
        showClearIcon: event.detail.value.length > 0,
        value: event.detail.value
      });
      // 键盘输入时触发，event.detail = {value, cursor, keyCode}，keyCode 为键值
      this.triggerEvent('input', event.detail);
      this.triggerEvent('change', event.detail);
    },
    onFocus(event: WechatMiniprogram.InputFocus) {
      if (this.data.value !== '') {
        this.setData({ showClearIcon: true });
      }
      // 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
      this.triggerEvent('focus', event.detail);
    },
    onBlur(event: WechatMiniprogram.InputBlur) {
      this.setData({ showClearIcon: false });
      // 输入框失去焦点时触发，event.detail = { value, encryptedValue, encryptError }
      this.triggerEvent('blur', event.detail);
    },
    onConfirm(event: WechatMiniprogram.InputConfirm) {
      // 点击完成按钮时触发，event.detail = { value }
      this.triggerEvent('confirm', event.detail);
    },
    onKeyboardheightchange(event: WechatMiniprogram.InputKeyboardHeightChange) {
      // 键盘高度发生变化的时候触发此事件，event.detail = {height: height, duration: duration}
      this.triggerEvent('keyboardheightchange', event.detail);
    },
    onClear() {
      this.setData({
        value: '',
        showClearIcon: false
      });
      // 点击清除图标是触发
      this.triggerEvent('clear');
      this.triggerEvent('change', { value: '', cursor: 0 });
    }
  }
});
