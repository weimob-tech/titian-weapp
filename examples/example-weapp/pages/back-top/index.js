Page({
  data: {
    list: Array(20).fill(1),
    options: [
      {
        type: 'radio',
        desc: '模式',
        key: 'mode',
        name: 'Mode',
        value: true,
        list: [
          {
            label: '图标',
            value: true
          },
          {
            label: '图文',
            value: false,
            attr: { text: '顶部' }
          }
        ]
      }
    ],
    attrs: {}
  },
  onChange(e) {
    const { detail } = e;
    this.setData({
      attrs: { visibilityHeight: 100, duration: 450, ...detail }
    });
  },
  onShareAppMessage() {
    return {
      title: 'Back Top 回到顶部',
      path: 'pages/back-top/index'
    };
  }
});
