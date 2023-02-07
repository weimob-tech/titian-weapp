Page({
  data: {
    options: [
      { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
      {
        key: 'prefix',
        type: 'radio',
        name: 'State',
        desc: '前缀',
        list: [
          { label: '无', value: 1, attr: { prefix: '' } },
          { label: '文案', value: 2, attr: { prefix: '最低' } }
        ],
        value: 1
      },
      {
        key: 'suffix',
        type: 'radio',
        name: 'State',
        desc: '后缀',
        list: [
          { label: '无', value: 1, attr: { suffix: '' } },
          { label: '文案', value: 2, attr: { suffix: '起' } }
        ],
        value: 1
      }
    ],
    attrs: {},
    cssVariable: ''
  },

  onChange(event) {
    const attr = event.detail;

    this.setData({
      attrs: { ...this.data.attrs, ...attr },
      cssVariable: `--theme-price:${attr.color};`
    });
  }
});
