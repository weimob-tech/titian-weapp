import { hexToRGBA, RGBToRGBA } from '../common/utils/color';

// const hexRegx = /#[0-9a-fA-F]{6}/;
// const rgbRegx = /rgb\(\s*(?:(\d{1,3})\s*,?){3}\)/;
// const rgbaRegx = /^rgba\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d*(?:\.\d+)?)\)$/;

const color = Behavior({
  properties: {
    // 颜色
    color: String
  },
  data: {
    rgbaColor: ''
  },
  observers: {
    color(colorStr) {
      colorStr = colorStr.trim();
      if (!colorStr) return;
      let rgbaColor = '';
      if (colorStr.includes('#')) {
        rgbaColor = hexToRGBA(colorStr);
      } else if (colorStr.includes('rgba')) {
        rgbaColor = colorStr;
      } else if (colorStr.includes('rgb')) {
        rgbaColor = RGBToRGBA(colorStr);
      }

      this.setData({
        rgbaColor
      });
    }
  }
});

export default color;
