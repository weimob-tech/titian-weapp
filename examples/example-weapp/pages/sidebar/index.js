Page({
  onShareAppMessage() {
    return {
      title: 'Sidebar 侧边栏',
      path: 'pages/sidebar/index'
    };
  },
  data: {
    options: [
      {
        type: 'color',
        name: 'color',
        key: 'color',
        desc: '颜色 ',
        value: '#212121',
        list: [
          { label: 'red', value: '#fa2c19' },
          { label: 'orange', value: '#ffa300' },
          { label: 'green', value: '#07c160' },
          { label: 'blue', value: '#2a6ae9' },
          { label: 'black', value: '#212121' }
        ]
      },
      {
        type: 'radius',
        name: 'shape',
        key: 'radius',
        desc: '圆角',
        value: 16
      }
    ],
    attrs: {}
  },

  onChange(e) {
    const { detail } = e;
    this.setData({ attrs: detail });
  },
  onChangeSelected(e) {
    const { detail } = e;
    console.log('onChangeSelected ', detail);
  }
});
