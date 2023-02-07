import BasicComponent from '../common/basic/BasicComponent';
import { EDividerPosition, EDividerOrientation } from './const';

BasicComponent({
  properties: {
    // 虚线
    dashed: Boolean,

    // 发丝线
    hairline: Boolean,

    // 文本位置，可选值left、center、right
    textAlign: {
      type: String,
      value: EDividerPosition.CENTER
    },

    // 颜色，包括分割线和文字
    color: String,

    // 分割线颜色
    borderColor: String,

    // 分割线厚度
    borderWidth: {
      type: Number,
      value: 2
    },

    // 分割线方向
    orientation: {
      type: String,
      value: EDividerOrientation.HORIZONTAL
    },

    // 根节点样式
    extStyle: String
  }
});
