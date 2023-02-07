// pages/checkbox/index.js
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
        value: 'TiCheckbox',
        desc: '模式',
        list: [
          { label: '标准', value: 'TiCheckbox', hiddenItems: ['ext'] },
          { label: '按钮', value: 'TiCheckboxButton' }
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
        attr: { group: ['选项 A', '选项 B', '选项 C'] }
      },
      { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
      {
        key: 'radius',
        type: 'radius',
        name: 'Radius',
        desc: '圆角',
        min: 1,
        value: 16,
        max: 16
      },
      {
        key: 'limit',
        type: 'radio',
        name: 'Limit',
        desc: '限制',
        list: [
          { label: '无', value: 100 },
          { label: '限制数量', value: 2 }
        ],
        value: 100
      }
    ],
    attr: {
      limit: 100
    }
  },
  onChange(event) {
    event.detail.radius = event.detail.radius || 999;
    this.setData({ attr: event.detail });
  },
  onCheckboxChange(event) {
    wx.showToast({
      title: `选中了 ${event.detail.join(', ')}`,
      icon: false,
      duration: 300
    });
  },
  onShareAppMessage() {
    return {
      title: 'Checkbox 多选框',
      path: 'pages/checkbox/index'
    };
  }
});
