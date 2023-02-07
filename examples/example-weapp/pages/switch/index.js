/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
// pages/loading/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: [
      {
        key: 'state',
        type: 'radio',
        name: 'State',
        desc: '状态',
        list: [
          { label: '常规', value: 1 },
          { label: '禁用', value: 2, attr: { disabled: true } },
          { label: '加载', value: 3, attr: { loading: true } }
        ],
        value: 1
      },
      { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
      {
        key: 'size',
        type: 'radio',
        name: 'Size',
        desc: '规格',
        list: [
          { label: 'Medium', value: 40 },
          { label: 'Big', value: 56 }
        ],
        value: 40
      }
    ],
    attr: {},
    refresh: true
  },
  onChange(event) {
    this.setData({ refresh: false }, () => {
      this.setData({ attr: event.detail, refresh: true });
    });
  },
  onSwitchChange(e) {
    console.log(e.detail);
  },
  onShareAppMessage() {
    return {
      title: 'Switch 开关',
      path: 'pages/switch/index'
    };
  }
});
