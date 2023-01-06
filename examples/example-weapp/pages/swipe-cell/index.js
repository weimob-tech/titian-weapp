// eslint-disable-next-line import/extensions
import { mergeOptionIntoAttrs } from '../../util/index.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: [
      {
        key: 'mode',
        type: 'radio',
        name: 'Mode',
        desc: '模式',
        list: [
          { label: '单元格', value: 1 },
          { label: '商品列表', value: 2 }
        ],
        value: 1
      },
      {
        key: 'number',
        type: 'radio',
        name: 'Number',
        desc: '按钮数',
        list: [
          { label: '1个', value: 1 },
          { label: '2个', value: 2 }
        ],
        value: 1
      },

      {
        key: 'direction',
        type: 'radio',
        name: 'Direction',
        desc: '方向',
        list: [
          { label: '左滑', value: 'left' },
          { label: '右滑', value: 'right' }
        ],
        value: 'left'
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
    //         if (o.property) {
    //           Object.assign(afterAttr, o.property);
    //         } else {
    //           afterAttr[opt.key] = o.value;
    //         }
    //       }
    //     });
    //   } else {
    //     afterAttr[opt.key] = attr[opt.key];
    //   }
    // });
    this.setData({
      attr: afterAttr
    });
  },
  onOpen(event) {
    wx.showToast({
      title: `滑动到${event.detail.position}`
    });
  },
  onClose(event) {
    wx.showToast({
      title: `关闭 ${event.detail.position}`
    });
  },
  onClick() {
    wx.showToast({
      title: '点击了',
      icon: 'none'
    });
  },
  onChangeByRadio() {},
  onShareAppMessage() {
    return {
      title: 'Swipe Cell 滑动单元格',
      path: 'pages/swipe-cell/index'
    };
  }
});
