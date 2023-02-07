// pages/radio/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: [
      {
        key: 'type',
        type: 'radio',
        name: 'Type',
        value: 'TiRadio',
        desc: '模式',
        list: [
          { label: '标准', value: 'TiRadio', hiddenItems: ['ext'] },
          { label: '按钮', value: 'TiRadioButton' }
        ]
      },
      {
        key: 'ext',
        type: 'radio',
        name: '',
        value: 'normal',
        desc: '搭配',
        list: [
          { label: '常规', value: 'normal', attr: { iconName: '' } },
          {
            label: '搭图标',
            value: 'icon',
            attr: { iconName: 'right-custom' }
          },
          { label: '搭图片', value: 'image', attr: { iconName: '' } }
        ]
      },
      {
        key: 'state',
        type: 'radio',
        name: 'State',
        desc: '状态',
        list: [
          { label: '常规', value: 1 },
          { label: '禁用', value: 2, attr: { disabled: true } }
        ],
        value: 1,
        attr: {
          group: ['选项 A', '选项 B', '选项 C']
        }
      },
      { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
      {
        key: 'radius',
        type: 'radius',
        name: 'Radius',
        desc: '圆角',
        value: 16,
        max: 16
      }
    ],
    attr: {
      limit: 100
    }
  },
  onChange(event) {
    this.setData({ attr: event.detail });
  },
  onRadioChange(event) {
    wx.showToast({
      title: `选中了 ${event.detail}`,
      icon: false,
      duration: 300
    });
  },
  onShareAppMessage() {
    return {
      title: 'Radio 单选框',
      path: 'pages/radio/index'
    };
  }
});
