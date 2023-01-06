import color from '../behaviors/color';
import BasicComponent from '../common/basic/BasicComponent';
import { RGBToRGBA } from '../common/utils/color';
import { ETagVariant, ETagSize, ETagShape } from './const';

BasicComponent({
  behaviors: [color],
  properties: {
    // 类型，可选值`contained` `filled` `outlined`
    variant: {
      type: String,
      value: ETagVariant.CONTAINED
    },

    // 大小，可选值`small` `medium` `big`
    size: {
      type: String,
      value: ETagSize.MEDIUM
    },

    // 形状，可选值`capsule` `round` `rect` `leaf`
    shape: {
      type: String,
      value: ETagShape.ROUND
    },

    // 左侧图标名称
    leftIcon: {
      type: String,
      value: ''
    },

    // 右侧图标名称
    rightIcon: {
      type: String,
      value: ''
    },

    // 根节点样式
    extStyle: {
      type: String
    }
  },
  observers: {
    rgbaColor: function rgbaColorChanged(rgbaColor) {
      if (rgbaColor) {
        this.setData({
          cssVariable: `--tag-color:${rgbaColor};--tag-color-10:${RGBToRGBA(rgbaColor, 0.1)}`
        });
      }
    }
  },
  data: {
    ETagVariant,
    ETagSize
  },
  methods: {}
});
