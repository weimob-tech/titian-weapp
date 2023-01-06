Page({
  data: {
    options: [
      {
        type: 'color',
        name: 'Color',
        key: 'color',
        desc: '颜色',
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
        key: 'title',
        type: 'radio',
        name: 'Title',
        desc: '标题',
        list: [
          { label: '无', value: false },
          { label: '有', value: true, attr: { titleText: '标题信息' } }
        ],
        value: false
      },
      {
        key: 'cancel',
        type: 'radio',
        name: 'Cancel',
        desc: '取消按钮',
        list: [
          { label: '无', value: false },
          { label: '有', value: true, attr: { cancelText: '取消' } }
        ],
        value: false
      },
      {
        key: 'loading',
        type: 'radio',
        name: 'Loading',
        desc: '加载',
        list: [
          { label: '无', value: false },
          { label: '有', value: true }
        ],
        value: false
      }
    ],
    actions: [
      { name: '选项1', value: '1' },
      { name: '选项2', value: '2' },
      { name: '选项3', value: '3', icon: 'delete' }
    ],
    visible: false
  },
  open() {
    this.setData({
      visible: true
    });
  },
  onClose() {
    this.setData({
      visible: false
    });
  },
  onSelect({ detail }) {
    wx.showToast({ title: detail.name, icon: 'none' });
  },
  onChange(e) {
    this.setData({
      attrs: e.detail
    });
    this.setData({
      'actions[2].loading': e.detail.loading
    });
  },
  onShareAppMessage() {
    return {
      title: 'Action Sheet 动作面板',
      path: 'pages/action-sheet/index'
    };
  }
});
