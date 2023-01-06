// pages/tabbar/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: [
      {
        type: 'radio',
        name: 'Arrow',
        key: 'direction',
        desc: '箭头 ',
        list: [
          { label: '向下', value: 'bottom' },
          { label: '向上', value: 'top' }
        ],
        value: 'bottom'
      },
      {
        type: 'radio',
        name: 'Style',
        key: 'style',
        desc: '样式 ',
        list: [
          { label: '样式1', value: 1 },
          { label: '样式2', value: 2 },
          { label: '样式3', value: 10 }
        ],
        value: 10
      },
      {
        type: 'radio',
        name: 'Position',
        key: 'position',
        desc: '位置 ',
        list: [
          {
            label: '居左',
            value: 'left',
            attr: {
              text: '左侧气泡提示',
              justifyContent: 'flex-start',
              order: 2
            }
          },
          {
            label: '居中',
            value: 'center',
            attr: {
              text: '剧中气泡提示信息文案',
              justifyContent: 'flex-start',
              marginLeft: 0
            }
          },
          {
            label: '居右',
            value: 'right',
            attr: { text: '右侧气泡提示', justifyContent: 'flex-end' }
          }
        ],
        value: 'left'
      }
    ],
    attr: null
  },
  onChange(event) {
    this.setData({ attr: event.detail });
  },
  onShareAppMessage() {
    return {
      title: 'Tootip 文本提示',
      path: 'pages/tooltip/index'
    };
  }
});
