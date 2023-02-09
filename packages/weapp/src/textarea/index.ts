import BasicComponent from '../common/basic/BasicComponent';

BasicComponent<
  {
    count: number;
    textareaHeight: number;
  },
  WechatMiniprogram.Component.PropertyOption,
  WechatMiniprogram.Component.MethodOption
>({
  externalClasses: ['textarea-class'],
  properties: {
    extStyle: String,
    value: String,
    placeholder: String,
    placeholderStyle: String,
    disabled: Boolean,
    maxlength: {
      type: Number,
      value: 140
    },
    autoFocus: Boolean,
    focus: Boolean,
    autoHeight: Boolean,
    fixed: Boolean,
    cursorSpacing: {
      type: Number,
      value: 0
    },
    cursor: Number,
    showConfirmBar: Boolean,
    selectionStart: {
      type: Number,
      value: -1
    },
    selectionEnd: {
      type: Number,
      value: -1
    },
    adjustPosition: {
      type: Boolean,
      value: true
    },
    holdKeyboard: Boolean,
    disableDefaultPadding: {
      type: Boolean,
      value: true
    },
    confirmType: {
      type: String,
      value: ''
    },
    confirmHold: Boolean,
    showCount: {
      type: Boolean,
      value: false
    }
  },
  data: {
    count: 0,
    textareaHeight: 0
  },
  observers: {
    value(value) {
      let count = 0;
      if (value) {
        count = this.data.maxlength > 0 ? Math.min(value.length, this.data.maxlength) : value.length;
      }
      this.setData({ count });
    }
  },
  lifetimes: {
    attached() {}
  },
  methods: {
    onInput(event: WechatMiniprogram.TextareaInput) {
      const len = event.detail.value.length;
      const count = this.data.maxlength > 0 ? Math.min(len, this.data.maxlength) : len;
      this.setData({ count });
      this.triggerEvent('input', event.detail);
    },
    onFocus(event: WechatMiniprogram.TextareaFocus) {
      this.triggerEvent('focus', event.detail);
    },
    onBlur(event: WechatMiniprogram.TextareaBlur) {
      this.triggerEvent('blur', event.detail);
    },
    onConfirm(event: WechatMiniprogram.TextareaConfirm) {
      this.triggerEvent('confirm', event.detail);
    },
    onKeyboardheightchange(event: WechatMiniprogram.TextareaKeyboardHeightChange) {
      this.triggerEvent('keyboardheightchange', event.detail);
    },
    onLinechange(event: WechatMiniprogram.TextareaLineChange) {
      this.triggerEvent('linechange', event.detail);
    }
  }
});
