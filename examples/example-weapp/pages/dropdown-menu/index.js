Page({
  data: {
    options: [
      { key: 'activeColor', type: 'color', name: 'Color', desc: '颜色' },
      {
        key: 'state',
        type: 'radio',
        name: 'State',
        desc: '状态',
        list: [
          { label: '常规', value: 1, attr: { disabled: false } },
          { label: '禁用', value: 2, attr: { disabled: true } }
        ],
        value: 1
      },
      {
        key: 'direction',
        type: 'radio',
        name: 'Direction',
        desc: '方向',
        list: [
          { label: '向下', value: 1, attr: { direction: 'down' } },
          { label: '向上', value: 2, attr: { direction: 'up' } }
        ],
        value: 1
      },
      {
        key: 'selectMode',
        type: 'radio',
        name: 'Select Mode',
        desc: '选择模式',
        list: [
          { label: '单选', value: 1, attr: { mode: 'single' } },
          { label: '多选', value: 2, attr: { mode: 'multiple' } }
        ],
        value: 1
      },
      {
        key: 'buttonType',
        type: 'radio',
        name: 'Button Type',
        desc: '交互',
        list: [
          { label: '复选框', value: 1, attr: { type: 'checkbox' } },
          { label: '开关', value: 2, attr: { type: 'switch' } }
        ],
        value: 1
      }
    ],
    attrs: {
      hasMask: true,
      direction: 'down',
      activeColor: '',
      mode: 'single',
      icon: '',
      type: 'checkbox',
      closeOnMask: false,
      dropMenuOptions: [
        {
          title: '选项1',
          value: '1'
        },
        {
          title: '选项2',
          value: '2'
        }
      ]
    }
  },
  onCloseDropDown(event) {
    const { idx } = event.currentTarget.dataset;
    wx.showToast({
      title: `关闭 ${idx}`,
      duration: 1000,
      icon: false
    });
  },
  onOpenDropdown(event) {
    const { idx } = event.currentTarget.dataset;
    wx.showToast({
      title: `展开 ${idx}`,
      duration: 1000,
      icon: false
    });
  },
  onChange(e) {
    const { detail } = e;
    const { attrs } = this.data;

    this.setData({ attrs: { ...attrs, ...detail } });
  },
  onChangeDropDown(event) {
    const { value } = event.detail;

    wx.showToast({
      title: `选择了 ${typeof value === 'string' ? value : value.join(',')}`,
      duration: 1000,
      icon: false
    });
  },
  onShareAppMessage() {
    return {
      title: 'Dropdown Menu 下拉菜单',
      path: 'pages/dropdown-menu/index'
    };
  }
});
