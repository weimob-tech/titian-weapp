import BasicComponent from '../common/basic/BasicComponent';
import { debounce } from '../common/utils/index';

enum EInputNumberSize {
  /** 默认 */
  MEDIUM = 'medium',

  /** 大号 */
  BIG = 'big'
}

enum EInputNumberVariant {
  /** 背景块型 */
  BLOCK = 'block',

  /** 纯净型 */
  PURE = 'pure',

  /** 明亮型 */
  BRIGHT = 'bright'
}

BasicComponent({
  externalClasses: ['ext-minus-class', 'ext-input-class', 'ext-plus-class'],
  properties: {
    // 数字输入框的尺寸，可选值为 `default` `big`
    size: {
      type: String,
      value: EInputNumberSize.MEDIUM
    },

    // 是否添加外边框
    border: Boolean,

    // 数字输入框的风格，可选值为 `pure` `block` `bright`
    variant: {
      type: String,
      value: EInputNumberVariant.PURE
    },

    // 按钮为圆形
    round: Boolean,

    // 输入框宽度，默认单位为rpx
    inputWidth: Number,

    // 宽度自适应
    autoWidth: Boolean,

    // 输入值
    value: {
      type: null,
      observer(val, oldVal) {
        if (val !== oldVal) {
          this.setData({ preValue: val });
        }
      }
    },

    // 步长
    step: {
      type: Number,
      value: 1
    },

    // 最小值
    min: {
      type: Number,
      value: Number.MIN_SAFE_INTEGER
    },

    // 最大值
    max: {
      type: Number,
      value: Number.MAX_SAFE_INTEGER
    },

    // 是否禁用输入，只能通过按钮操作
    disabledInput: Boolean,

    // 是否开启异步变更，开启后需要手动控制输入值
    asyncChange: {
      type: Boolean,
      value: false
    },

    // 是否收起输入框
    thumbnail: {
      type: Boolean,
      value: false
    },

    // 是否禁用
    disabled: Boolean,

    // 根节点样式
    extStyle: String,

    // value值为0，只展示加号
    initOnlyPlus: Boolean,

    // 是否只允许输入整数
    integer: Boolean,

    readOnly: Boolean,
    readOnlyInput: Boolean
  },
  data: {
    iconSize: 24,
    preValue: -1
  },
  observers: {
    'size, variant': function fn(size: string, variant: string) {
      let { min } = this.data;
      const iconSize = size === EInputNumberSize.BIG ? 28 : 24;
      if (variant === EInputNumberVariant.BRIGHT) {
        min = Math.max(0, min);
      }
      this.setData({ iconSize, min });
    }
  },
  lifetimes: {
    attached() {
      this.onInput = debounce(this.inputChange);
    }
  },
  methods: {
    count(e: WechatMiniprogram.BaseEvent) {
      const { type } = e.currentTarget.dataset;
      let newValue = +this.data.value;
      newValue = type === 'plus' ? +this.data.value + this.data.step : +this.data.value - this.data.step;

      this.onChange(newValue, type);
    },
    inputChange(event: WechatMiniprogram.InputFocus) {
      if (event.detail.value === '') return;

      if (!this.data.integer && event.detail.value.indexOf('.') === event.detail.value.length - 1) return;
      const value = this.data.integer ? parseInt(event.detail.value, 10) : +event.detail.value;

      if (value <= this.data.max && value >= this.data.min) {
        this.triggerEvent('change', value);
      }
      // 当绑定值变化时触发的事件
      if (!this.data.asyncChange) {
        this.setData({ value });
      }
    },
    onChange(value: number, type?: string) {
      if (this.data.disabled || this.data.readOnly) return;
      const newValue = Math.max(Math.min(this.data.max, value), this.data.min);
      if (value > this.data.max || value < this.data.min) {
        let currentType = type;
        if (!type) {
          currentType = value > this.data.max ? 'plus' : 'minus';
        }
        this.triggerEvent('overlimit', { type: currentType });
      } else if (type) {
        this.triggerEvent(type, value);
      }
      if (newValue !== this.data.preValue) {
        this.triggerEvent('change', newValue);
      }
      if (!this.data.asyncChange || !type) {
        this.setData({ value: newValue, preValue: newValue });
      } else {
        this.setData({ preValue: newValue });
      }
    },
    onFocus(event: WechatMiniprogram.InputFocus) {
      // 输入框聚焦时触发
      this.triggerEvent('focus', event.detail);
    },
    onBlur(event: WechatMiniprogram.InputBlur) {
      const value = +event.detail.value;
      this.onChange(value);
      // 输入框失焦时触发
      this.triggerEvent('blur', { ...event.detail, value });
    },
    onClickThumbnail() {
      if (this.data.disabled || this.data.readOnly) return;
      this.setData({ thumbnail: false });
    },
    onClickInput() {
      this.triggerEvent('click-input');
    }
  }
});
