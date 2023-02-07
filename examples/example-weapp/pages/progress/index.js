// eslint-disable-next-line import/extensions
import { mergeOptionIntoAttrs } from '../../util/index.js';

Page({
  data: {
    loaded: true,
    value: 0,
    buffer: 0,
    gradientColor: {
      from: '#108ee9',
      to: '#87d068'
    },
    options: [
      {
        key: 'mode',
        type: 'radio',
        name: 'Mode',
        desc: '模式',
        list: [
          { label: '直线', value: 'line' },
          { label: '环形', value: 'circle' }
        ],
        value: 'line'
      },
      { key: 'color', type: 'color', name: 'Color', desc: '颜色' },

      {
        key: 'strokeWidth',
        type: 'radio',
        name: 'Size',
        desc: '规格',
        list: [
          { label: 'Medium', value: '8' },
          { label: 'Big', value: '16' }
        ],
        value: '8'
      },
      {
        key: 'information',
        type: 'radio',
        name: 'Information',
        desc: '信息',
        list: [
          { label: '无', value: 0, attr: { showProgress: false } },
          { label: '进度', value: 1, attr: { showProgress: true } }
        ],
        value: 0
      },
      {
        key: 'value',
        type: 'radius',
        name: 'Progress',
        desc: '进度',
        value: 75,
        max: 100
      }
    ],
    attrs: {}
  },
  changeData(key, num) {
    const total = Math.min(100, this.data[key] + num);
    this.setData({ [key]: total }, () => {
      if (total < 100) {
        setTimeout(() => {
          this.changeData(key, num);
        }, 300);
      }
    });
  },
  onChange(event) {
    const { options } = this.data;
    const attr = event.detail;
    const afterAttr = mergeOptionIntoAttrs(options, attr);
    this.setData({ loaded: false }, () => {
      this.setData({
        attrs: afterAttr,
        loaded: true
      });
    });
  },
  onReady() {
    this.changeData('value', 10);
    this.changeData('buffer', +((Math.random() + 1) * 10).toFixed());
  },
  onShareAppMessage() {
    return {
      title: 'Progress 进度条',
      path: 'pages/progress/index'
    };
  }
});
