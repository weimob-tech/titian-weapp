Page({
  data: {
    attrs: {},
    options: [
      {
        type: 'radio',
        desc: '模式',
        key: 'mode',
        name: 'Mode',
        value: 'default',
        list: [
          {
            value: 'default',
            label: '默认'
          },
          {
            value: 'custom',
            label: '自定义',
            hiddenItems: ['color', 'extStyle'],
            attr: {
              extStyle: '--notice-bar-color:#FFFFFF; --notice-bar-background-color:rgba(33, 33, 33, 0.8);',
              color: '#ffffff'
            }
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
        name: 'Left',
        key: 'leftIcon',
        desc: '左侧',
        value: 'none',
        list: [
          {
            label: '空',
            value: 'none'
          },
          {
            label: '搭图标',
            value: 'speaker'
          }
        ]
      },
      {
        type: 'radio',
        name: 'Right',
        key: 'rightIcon',
        desc: '右侧',
        value: 'none',
        list: [
          {
            label: '空',
            value: 'none'
          },
          {
            label: '图标',
            value: 'arrow-right'
          },
          {
            label: '按钮',
            value: 'button',
            attr: {
              slotName: 'after',
              rightIcon: 'none'
            }
          }
        ]
      },
      {
        type: 'radio',
        name: 'Play',
        key: 'play',
        desc: '播放',
        value: 'no',
        list: [
          {
            label: '否',
            value: 'no'
          },
          {
            label: '水平滚动',
            value: 'horizontal',
            attr: { scrollable: true, variant: 'horizontal' }
          },
          {
            label: '垂直翻动',
            value: 'vertical',
            attr: { scrollable: true, variant: 'vertical' }
          }
        ]
      },
      {
        type: 'radio',
        name: 'Align',
        key: 'extStyle',
        desc: '对齐',
        value: 'text-align:center',
        list: [
          {
            label: '居左',
            value: 'text-align:left'
          },
          {
            label: '居中',
            value: 'text-align:center'
          }
        ]
      }
    ]
  },
  onChange(e) {
    const { detail } = e;

    this.setData({ attrs: { ...detail } });
  },
  onShareAppMessage() {
    return {
      title: 'Notice Bar 通告栏',
      path: 'pages/notice-bar/index'
    };
  }
});
