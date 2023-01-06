/* eslint-disable @titian-design/check-life-items */
import openType from '../behaviors/open-type';
import BasicComponent from '../common/basic/BasicComponent';
import { hexToRGB, RGBToRGBA } from '../common/utils/color';
import { canIUseFormFieldButton } from '../common/utils/version';
import { EButtonVariant, EButtonSize, EButtonShape, EButtonType } from './const';

const behaviors = [openType];
if (canIUseFormFieldButton()) {
  behaviors.push('wx://form-field-button');
}

BasicComponent({
  behaviors,
  externalClasses: ['prefix-icon-class', 'suffix-icon-class', 'loading-class', 'button-inner-class'],
  properties: {
    // 按钮尺寸,可选值为 `tiny` `small` `medium` `big` `large`
    size: {
      type: String,
      value: EButtonSize.BIG
    },

    // 	按钮类型，可选值为 `primary` `info` `error` `warning` `success` `simple`,
    type: {
      type: String,
      value: EButtonType.PRIMARY
    },

    // 按钮风格,可选值为 `contained` `filled` `outlined` `text`
    variant: {
      type: String,
      value: EButtonVariant.CONTAINED
    },

    // 按钮颜色,十六进制色值`#ffffff`,`linear-gradient`渐变色,关键字如`blue`等
    color: String,

    // 按钮圆角风格，可选值为 `capsule` `round` `rect`
    shape: {
      type: String,
      value: EButtonShape.ROUND
    },

    // 是否使用发丝1px边框
    hairline: {
      type: Boolean,
      value: true
    },

    // 是否禁用按钮
    disabled: Boolean,

    // 是否显示为加载状态
    loading: Boolean,

    // 是否为行内元素，开启后宽度为自适应
    block: {
      type: Boolean,
      value: false
    },

    // 按钮文字左侧图标
    prefixIcon: String,

    // 按钮文字右侧图标
    suffixIcon: String,

    // 加载图标大小，单位rpx
    loadingSize: {
      type: Number,
      value: 30
    },

    // 加载图标类型，可选择`circular` `spinner`
    loadingType: {
      type: String,
      value: 'circular'
    },

    // 加载图标为字
    loadingText: String,

    // 用于form组件，可选值为`submit` `reset`，点击分别会触发form组件的submit/reset事件
    formType: String,

    // 指定按钮按下去的样式类。当 `hover-class="none"` 时，没有点击态效果
    hoverClass: {
      type: String,
      value: 'active'
    },

    // 按住后多久出现点击态，单位毫秒
    hoverStartTime: {
      type: Number,
      value: 20
    },

    // 手指松开后点击态保留时间，单位毫秒
    hoverStayTime: {
      type: Number,
      value: 70
    },

    // 根节点样式
    extStyle: String,

    // 按钮 dataset，open-type 为 `share` 时，可在 onShareAppMessage 事件的 `event.target.dataset.detail` 中看到传入的值
    dataset: null
  },
  data: {
    subBgColor: '',
    bgColorActive: '',
    currentColor: '',
    gradient: false
  },
  observers: {
    'color, variant, type': function fn(color: string, variant: string, type: string) {
      this.setSubColor(color, variant, type);
    }
  },
  lifetimes: {
    attached() {
      this.setSubColor(this.data.color, this.data.variant, this.data.type);
    }
  },
  methods: {
    getColor(type: string, opacity = 1) {
      const buttonTypes: { [key: string]: string } = {
        primary: `rgba(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25), ${opacity})`,
        warning: `rgba(var(--warning-r, 255), var(--warning-g, 163), var(--warning-b, 0), ${opacity})`,
        error: `rgba(var(--error-r, 255), var(--error-g, 46), var(--error-b, 46), ${opacity})`,
        success: `rgba(var(--success-r, 7), var(--success-g, 193), var(--success-b, 96), ${opacity})`,
        info: `rgba(var(--link-r, 42), var(--link-g, 106), var(--link-b, 233), ${opacity})`,
        simple: `rgba(117, 117, 117, ${opacity})`
      };
      return buttonTypes[type];
    },

    formatColor(colorStr: string, opacity = 1) {
      let rgba = '';
      if (colorStr.includes('#')) {
        rgba = hexToRGB(colorStr, opacity);
      }
      if (colorStr.includes('rgba')) {
        const reg = /^rgba?\((.+)\)$/g;
        const a = colorStr.replace(reg, (_s, $1) => $1);
        const [r, g, b] = a.split(',');
        rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      if (colorStr.includes('rgb')) {
        rgba = RGBToRGBA(colorStr, opacity);
      }
      return rgba;
    },

    setSubColor(color: string, variant: string, type: string) {
      color = color || this.getColor(type);
      const newData = {
        currentColor: color,
        gradient: false,
        subBgColor: '',
        bgColorActive: ''
      };
      if (variant === 'filled') {
        newData.subBgColor = this.data.color ? this.formatColor(color, 0.1) : this.getColor(type, 0.1);
        newData.bgColorActive = this.data.color ? this.formatColor(color, 0.2) : this.getColor(type, 0.2);
      } else if (variant === 'outlined') {
        newData.bgColorActive = this.data.color ? this.formatColor(color, 0.1) : this.getColor(type, 0.1);
      } else if (variant === 'contained') {
        newData.bgColorActive = color;
        newData.gradient = true;
      }
      this.setData(newData);
    },
    onClick() {
      if (this.data.disabled || this.data.loading) return;
      // 点击按钮，且按钮状态不为加载或禁用时触发
      this.triggerEvent('click');
    }
  }
});
