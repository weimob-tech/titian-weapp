Page({
  data: {
    options: [
      {
        type: 'radio',
        desc: '模式',
        key: 'dashed',
        name: 'Mode',
        value: false,
        list: [
          {
            label: '实线',
            value: false,
            attr: { orientation: 'horizontal' }
          },
          {
            label: '虚线',
            value: true,
            attr: { orientation: 'horizontal' }
          },
          {
            label: '纵向',
            value: 'vertical',
            attr: { orientation: 'vertical', dashed: false },
            hiddenItems: ['textPlacement', 'textAlign']
          }
        ]
      },
      {
        type: 'color',
        name: 'Color',
        key: 'color',
        desc: '颜色 ',
        value: '#fa2c19'
      },
      {
        type: 'radio',
        desc: '粗细',
        key: 'borderWidth',
        name: 'Weight',
        value: 1,
        list: [
          {
            label: '发丝',
            value: 1,
            attr: { hairline: true }
          },
          {
            label: '1px',
            value: 2
          },
          {
            label: '2px',
            value: 4
          }
        ]
      },
      {
        type: 'radio',
        desc: '文字',
        key: 'textPlacement',
        name: 'Text',
        value: 'none',
        list: [
          {
            label: '无',
            value: 'none',
            hiddenItems: ['textAlign']
          },
          {
            label: '有',
            value: '分割线',
            attr: { text: '分割线' }
          }
        ]
      },
      {
        type: 'radio',
        desc: '位置',
        key: 'textAlign',
        name: 'Position',
        value: 'center',
        list: [
          {
            label: '左',
            value: 'left'
          },
          {
            label: '中',
            value: 'center'
          },
          {
            label: '右',
            value: 'right'
          }
        ]
      }
    ],
    attrs: {}
  },

  onChange(e) {
    const { detail } = e;

    this.setData({ attrs: { ...detail } });
  },

  onShareAppMessage() {
    return {
      title: 'Divider 分割线',
      path: 'pages/divider/index'
    };
  }
});
