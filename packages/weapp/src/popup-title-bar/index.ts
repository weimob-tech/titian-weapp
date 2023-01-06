/* eslint-disable func-names */
import BasicComponent from '../common/basic/BasicComponent';
import EPopupTitleBarVariantType from './const';

BasicComponent({
  properties: {
    // 标题
    title: String,

    // 副标题
    subTitle: String,

    // 标题栏类型，可选值`with-confirm`, `cancel-only`, `mini`
    variant: {
      type: String,
      value: EPopupTitleBarVariantType.WithConfirm
    },

    // 确认按钮的文案
    confirmText: { type: String, value: '确定' },

    // 取消按钮的文案
    cancelText: { type: String, value: '取消' },

    // 根节点样式
    extStyle: String
  },
  externalClasses: [
    'ext-left-class',
    'ext-left-icon-class',
    'ext-title-class',
    'ext-main-title-class',
    'ext-sub-title-class',
    'ext-right-class',
    'ext-right-icon-class'
  ],
  observers: {
    'variant,confirmText,cancelText': function (variant, confirmText, cancelText) {
      if (this.status !== 'ready') return;
      if (this.variant !== variant || this.confirmText !== confirmText || this.cancelText !== cancelText) {
        this.changeProps({
          variant,
          confirmText,
          cancelText
        });
      }
    }
  },
  lifetimes: {
    created() {
      this.status = 'created';
    },
    ready() {
      this.status = 'ready';
      const { variant, confirmText, cancelText } = this.data as {
        variant: EPopupTitleBarVariantType;
        confirmText: string;
        cancelText: string;
      };
      this.changeProps({
        variant,
        confirmText,
        cancelText
      });
    }
  },
  data: {
    EPopupTitleBarVariantType,
    leftText: '',
    leftIcon: '',
    rightText: '',
    rightIcon: '',
    useLeft: true,
    useRight: true,
    useContainer: true,
    useTitle: true
  },
  methods: {
    onClick(
      event: WechatMiniprogram.CustomEvent<{
        position: 'left' | 'right' | 'title' | 'sub-title';
      }>
    ) {
      const { variant } = this.data;
      const { position } = event.detail;
      if (position === 'left') {
        if (variant === EPopupTitleBarVariantType.WithConfirm) {
          this.triggerEvent('cancel');
        } else if (variant === EPopupTitleBarVariantType.BackTitleClose) {
          this.triggerEvent('back');
        }
      } else if (position === 'right') {
        if (variant === EPopupTitleBarVariantType.WithConfirm) {
          this.triggerEvent('confirm');
        } else if (
          variant === EPopupTitleBarVariantType.MiniClose ||
          variant === EPopupTitleBarVariantType.CancelOnly
        ) {
          this.triggerEvent('close');
        }
      }
    },
    changeProps(props: { variant: EPopupTitleBarVariantType; confirmText: string; cancelText: string }) {
      this.variant = props.variant;
      this.confirmText = props.confirmText;
      this.cancelText = props.cancelText;
      let leftText = '';
      let leftIcon = '';
      let rightText = '';
      let rightIcon = '';
      let useContainer = true;
      let useLeft = true;
      let useTitle = true;
      switch (props.variant) {
        case EPopupTitleBarVariantType.WithConfirm:
          leftText = props.cancelText;
          rightText = props.confirmText;
          break;
        case EPopupTitleBarVariantType.CancelOnly:
          rightIcon = 'close';
          break;
        case EPopupTitleBarVariantType.BackTitleClose:
          rightIcon = 'close';
          leftIcon = 'nav-back';
          break;
        case EPopupTitleBarVariantType.MiniClose:
          rightIcon = 'close';
          useContainer = false;
          useLeft = false;
          useTitle = false;
          break;
        case EPopupTitleBarVariantType.LeftTitleClose:
          rightIcon = 'close';
          useLeft = false;
          break;
        default:
          break;
      }
      this.setData({
        leftText,
        leftIcon,
        rightText,
        rightIcon,
        useContainer,
        useLeft,
        useTitle
      });
    }
  }
});
