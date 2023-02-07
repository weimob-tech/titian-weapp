Page({
  data: {
    options: [
      {
        type: 'radio',
        desc: '模式',
        key: 'dashed',
        name: 'Mode',
        value: 0,
        list: [
          {
            label: '图标',
            value: 0,
            attr: { atText: false, isIcon: true },
            hiddenItems: ['position']
          },
          {
            label: '文字',
            value: 1,
            attr: { atText: true, isText: true },
            hiddenItems: ['position', 'spread']
          },
          {
            label: '自定义',
            value: 2,
            attr: { atText: false, isIcon: true },
            hiddenItems: ['badge', 'spread']
          }
        ]
      },
      {
        type: 'radio',
        desc: '徽标',
        key: 'badge',
        name: 'Badge',
        value: 0,
        list: [
          {
            label: '红点',
            value: 0,
            attr: { dot: true },
            hiddenItems: ['spread']
          },
          {
            label: '图标',
            value: 1,
            attr: { icon: 'home' },
            hiddenItems: ['spread']
          },
          {
            label: '个位数',
            value: 2,
            attr: { content: '9' },
            hiddenItems: ['spread']
          },
          {
            label: '十位数',
            value: 3,
            attr: { content: '99' }
          },
          {
            label: '文字',
            value: 4,
            attr: { content: 'HOT' }
          }
        ]
      },
      {
        type: 'radio',
        desc: '文字延展',
        key: 'spread',
        name: 'Extend',
        value: 'toRight',
        list: [
          {
            label: '向左',
            value: 'toRight'
          },
          {
            label: '左右',
            value: 'bothSides'
          }
        ]
      },
      {
        type: 'radio',
        desc: '位置',
        key: 'position',
        name: 'Position',
        value: 0,
        list: [
          {
            label: '位置1',
            value: 0,
            attr: { offset: [-6, -2], dot: true }
          },
          {
            label: '位置2',
            value: 1,
            attr: { offset: [-6, 25], dot: true }
          },
          {
            label: '位置3',
            value: 2,
            attr: { offset: [-6, 55], dot: true }
          }
        ]
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
      title: 'Badge 徽标',
      path: 'pages/badge/index'
    };
  }
});
