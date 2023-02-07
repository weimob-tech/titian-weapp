// eslint-disable-next-line import/extensions
import { mergeOptionIntoAttrs } from '../../util/index.js';

Page({
  data: {
    slider: 15,
    options: [
      {
        desc: '模式',
        key: 'state',
        type: 'radio',
        name: 'Mode',
        list: [
          { label: '基础', value: 1 },
          {
            label: '自定义',
            value: 2,
            attr: { extClass: 'slider-thumb-class' }
          }
        ],
        value: 1
      },
      {
        type: 'color',
        name: 'Color',
        key: 'color',
        desc: '颜色 ',
        value: '#fa2c19'
      },
      {
        desc: '交互',
        key: 'interaction',
        type: 'radio',
        name: 'Interaction',
        list: [
          { label: '默认', value: 1 },
          { label: '指定范围', value: 2, attr: { min: -100, max: 100 } },
          { label: '指定步长', value: 3, attr: { step: 20 } }
        ],
        value: 1
      },
      {
        desc: '结果类型',
        key: 'orientation',
        type: 'radio',
        name: 'Type',
        list: [
          { label: '值', value: 0, attr: { orientation: 15 } },
          { label: '范围', value: 1, attr: { orientation: [15, 50] } }
        ],
        value: 0
      }
    ],
    attr: {}
  },
  onChange(event) {
    const { options } = this.data;
    const attr = event.detail;

    const afterAttr = mergeOptionIntoAttrs(options, attr);
    // options.forEach((opt) => {
    //   const attrVal = attr[opt.key];
    //   if (Array.isArray(opt.list)) {
    //     opt.list.forEach((o) => {
    //       if (o.value === attrVal) {
    //         afterAttr[opt.key] = o.value;
    //         if (o.attr) {
    //           Object.assign(afterAttr, o.attr);
    //         }
    //       }
    //     });
    //   } else {
    //     afterAttr[opt.key] = attr[opt.key];
    //   }
    // });
    if (JSON.stringify(this.value) !== JSON.stringify(attr.orientation)) {
      this.value = attr.orientation;
      this.setData({ attr: afterAttr, slider: this.value });
    } else {
      this.setData({ attr: afterAttr });
    }
  },
  onChange3(event) {
    const { value } = event.detail;
    wx.showToast({
      title: `${value}`,
      icon: 'none'
    });
    this.setData({
      slider: value
    });
  },
  onShareAppMessage() {
    return {
      title: 'Slider 滑块',
      path: 'pages/slider/index'
    };
  }
});
