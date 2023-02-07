import openType from '../behaviors/open-type';
import BasicComponent from '../common/basic/BasicComponent';
import { isFunction } from '../common/utils/index';
import { IDialogStaticOptions } from './types';

const staticOptions: IDialogStaticOptions = {
  cancelBtnText: '取消',
  isTextButton: false,
  hasCancelButton: true,
  confirmBtnText: '确定',
  onClose() {},
  onCancel() {},
  onConfirm() {}
};

BasicComponent({
  behaviors: [openType],
  externalClasses: [
    'ext-popup-class',
    'ext-popup-content-class',
    'ext-popup-mask-class',
    'ext-inner-class',
    'ext-title-class',
    'ext-content-class',
    'ext-actions-class',
    'ext-action-cancel-class',
    'ext-action-confirm-class'
  ],
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer(newVal) {
        this.setData({
          innerVisible: newVal
        });
      }
    },

    // 标题
    title: String,

    // 内容
    content: String,

    // 是否展示确认按钮
    hasCancelButton: {
      type: Boolean,
      value: true
    },

    closeOnMask: {
      type: Boolean,
      value: true
    },

    closeOnActions: {
      type: Boolean,
      value: true
    },

    // 取消按钮的文案
    cancelBtnText: {
      type: String,
      value: '取消'
    },

    // 确认按钮的文案
    confirmBtnText: {
      type: String,
      value: '确定'
    },

    // 是否为文字按钮
    isTextButton: {
      type: Boolean,
      value: false
    },
    useActionsSlot: {
      type: Boolean,
      value: false
    },
    useContentSlot: {
      type: Boolean,
      value: false
    },

    zIndex: {
      type: Number,
      value: 12000
    },
    confirmButtonBgColor: String,
    cancelButtonBgColor: String,
    transition: {
      type: String,
      value: 'fade-up'
    },
    timeout: {
      type: null,
      value: { appear: 1000 * 0.3, exit: 1000 * 0.2 }
    },

    // 根节点样式
    extStyle: String,

    confirmButtonColor: String,
    cancelButtonColor: String
  },
  data: {
    innerVisible: false,
    onCloseCallback: () => {},
    onCancelCallback: () => {},
    onConfirmCallback: () => {}
  },
  methods: {
    onCancel() {
      // 点击取消按钮时触发
      this.triggerEvent('cancel');

      if (isFunction(this.data.onCancelCallback)) {
        this.data.onCancelCallback();
        this.data.onCancelCallback = () => {};
      }
      if (this.data.closeOnActions) {
        this.close();
      }
    },
    onConfirm() {
      // 点击确认按钮时触发
      this.triggerEvent('confirm');

      if (isFunction(this.data.onConfirmCallback)) {
        this.data.onConfirmCallback();
        this.data.onConfirmCallback = () => {};
      }
      if (this.data.closeOnActions) {
        this.close();
      }
    },
    show(opts: IDialogStaticOptions) {
      const { onCancel, onConfirm, onClose, ...otherOpts } = opts;

      const params = { ...staticOptions, ...otherOpts };

      this.setData({
        ...params,
        innerVisible: true
      });
      if (isFunction(onCancel)) {
        this.data.onCancelCallback = onCancel.bind(this);
      }
      if (isFunction(onConfirm)) {
        this.data.onConfirmCallback = onConfirm.bind(this);
      }
      if (isFunction(onClose)) {
        this.data.onCloseCallback = onClose.bind(this);
      }
    },
    onClose() {
      if (isFunction(this.data.onCloseCallback)) {
        this.data.onCloseCallback();
        this.data.onCloseCallback = () => {};
      }
      this.close();
    },
    close() {
      this.triggerEvent('close');
      this.setData({
        innerVisible: false
      });
    },
    success(opts: IDialogStaticOptions) {
      this.show(opts);
    }
  }
});
