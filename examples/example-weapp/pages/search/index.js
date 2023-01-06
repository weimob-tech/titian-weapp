Page({
  data: {
    options: [
      {
        type: 'radio',
        desc: '模式',
        key: 'dashed',
        name: 'Mode',
        value: 1,
        list: [
          {
            label: '默认',
            value: 0,
            attr: { style: 0 },
            hiddenItems: ['style']
          },
          {
            label: '自定义',
            value: 1,
            attr: { style: 0 },
            hiddenItems: ['style']
          },
          {
            label: '搭配组件',
            value: 2,
            attr: {}
          }
        ]
      },
      {
        type: 'radio',
        desc: '对齐',
        key: 'align',
        name: 'Align',
        value: 0,
        list: [
          {
            label: '居左',
            value: 0,
            attr: { align: false }
          },
          {
            label: '剧中',
            value: 1,
            attr: { style: 0, align: true },
            hiddenItems: ['style']
          }
        ]
      },
      {
        type: 'radio',
        desc: '搭配',
        key: 'style',
        name: 'Style',
        value: 0,
        list: [
          {
            label: '搭配1',
            value: 0
          },
          {
            label: '搭配2',
            value: 1
          },
          {
            label: '搭配3',
            value: 2
          }
        ]
      },
      {
        type: 'radius',
        name: 'Radius',
        key: 'radius',
        desc: '圆角',
        value: 16
      }
    ],
    attrs: {}
  },
  onChange(e) {
    const { detail } = e;
    // eslint-disable-next-line no-console
    console.log('detail', detail);
    this.setData({ attrs: { ...detail } });
  },
  onShareAppMessage() {
    return {
      title: 'Search 搜索',
      path: 'pages/search/index'
    };
  }
});
