Page({
  data: {
    attrs: {},
    options: [
      {
        desc: '数字',
        key: 'displayNumber',
        type: 'radio',
        name: 'Number',
        value: true,
        list: [
          { label: '展示', value: true },
          { label: '隐藏', value: false }
        ]
      },
      {
        desc: '标题',
        key: 'displayTitle',
        type: 'radio',
        name: 'Title',
        value: true,
        list: [
          { label: '展示', value: true },
          { label: '隐藏', value: false }
        ]
      }
    ]
  },
  onChange(e) {
    this.setData({ attrs: e.detail });
  },
  onClick() {
    const preview = this.selectComponent('#preview');
    preview?.show([
      {
        fileType: 'image',
        title: 'image',
        path: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png'
      },
      {
        fileType: 'image',
        title: 'image2',
        path: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default2.png'
      }
    ]);
  },
  imageChange(e) {
    console.log(e);
  }
});
