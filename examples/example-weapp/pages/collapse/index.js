// pages/collapse/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: [1],
    active1: [1],

    list: [
      {
        title: '标题文字A',
        content: '- 标题A下的内容 -'
      },
      {
        title: '标题文字B',
        content: '- 标题B下的内容 -'
      }
    ],
    activeIsRepel: 0,
    arrayIsRepel: [
      {
        title: '标题文字A',
        content: '- 标题A下的内容 -'
      },
      {
        title: '标题文字B',
        content: '- 标题B下的内容 -'
      },
      {
        title: '标题文字C',
        content: '- 标题C下的内容 -'
      }
    ],

    activeMark: 'a2',
    arrayMark: [
      {
        title: '标题文字A',
        name: 'a1',
        content: '- 标题A下的内容 -'
      },
      {
        title: '标题文字B',
        name: 'a2',
        content: '- 标题B下的内容 -'
      },
      {
        title: '标题文字C',
        name: 'a3',
        content: '- 标题C下的内容 -'
      }
    ],
    options: [
      {
        key: 'mode',
        type: 'radio',
        desc: '模式',
        name: 'Mode',
        list: [
          { value: 'base', label: '基础' },
          { value: 'accordion', label: '手风琴' }
        ],
        value: 'base'
      }
    ],
    attr: null
  },
  onChange(event) {
    this.setData({ attr: event.detail });
  },
  onShareAppMessage() {
    return {
      title: 'Collapse 折叠面板',
      path: 'pages/collapse/index'
    };
  }
});
