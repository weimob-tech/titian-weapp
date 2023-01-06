Page({
  data: {
    activeTab: 0,
    options: [
      {
        key: 'button',
        type: 'radio',
        name: 'Mode',
        desc: '按钮 ',
        list: [
          { label: '无', value: false },
          { label: '有', value: true }
        ],
        value: false
      },
      {
        key: 'subtitle',
        type: 'radio',
        name: 'Subtitle',
        desc: '副标题 ',
        list: [
          { label: '无', value: '' },
          { label: '有', value: '补充说明文案请尽量简短' }
        ],
        value: ''
      },
      {
        key: 'size',
        type: 'radio',
        name: 'Size',
        desc: '规格 ',
        list: [
          { label: 'Medium', value: 'medium' },
          { label: 'Big', value: 'big' }
        ],
        value: 'big'
      }
    ],
    attr: {}
  },
  onChange(event) {
    this.setData({
      attr: event.detail
    });
  },
  onShareAppMessage() {
    return {
      title: 'Empty 空态',
      path: 'pages/empty/index'
    };
  }
});
