Page({
  data: {
    attrs: {},
    options: [
      {
        type: 'radio',
        name: 'Mode',
        key: 'mode',
        desc: '模式 ',
        value: 'basic',
        list: [
          { value: 'basic', label: '基础吸顶', attr: { text: '基础吸顶' } },
          {
            value: 'offset',
            label: '吸顶距离',
            attr: { text: '吸顶距离', top: 10 }
          },
          {
            value: 'container',
            label: '指定容器',
            attr: { text: '指定容器', containerClass: 'container' }
          }
        ]
      }
    ]
  },
  getContainer() {
    return () => wx.createSelectorQuery().in(this).select('#container');
  },
  onChange(e) {
    const { detail } = e;

    if (detail.mode === 'container') {
      detail.container = this.getContainer();
    } else {
      detail.container = null;
    }

    this.setData(
      {
        flag: false
      },
      () => {
        this.setData({
          flag: true,
          attrs: {
            text: '按钮',
            top: 0,
            ...detail
          }
        });
        this.setData({ 'attrs.container': detail.container });
      }
    );
  },
  onShareAppMessage() {
    return {
      title: 'Sticky 吸顶',
      path: 'pages/sticky/index'
    };
  }
});
