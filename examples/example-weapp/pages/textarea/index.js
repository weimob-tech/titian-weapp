Page({
  data: {
    refresh: true,
    options: [
      {
        type: 'radio',
        key: 'mode',
        name: 'Mode',
        desc: '模式',
        list: [
          { value: 'base', label: '基础' },
          { value: 'custom', label: '输入框', attr: { extClass: 'ext-class' } }
        ],
        value: 'base'
      },
      {
        type: 'radio',
        key: 'showCount',
        name: 'Count',
        desc: '字数统计 ',
        list: [
          { value: false, label: '无' },
          { value: true, label: '有' }
        ],
        value: false
      },
      {
        type: 'radio',
        key: 'autoHeight',
        name: 'Height',
        desc: '高度',
        list: [
          { value: false, label: '定高' },
          { value: true, label: '自适应' }
        ],
        value: false
      }
    ],
    attrs: {}
  },
  onChange(e) {
    const attrs = e.detail;
    if (attrs.autoHeight !== this.data.attrs.autoHeight) {
      this.setData({ refresh: false }, () => {
        this.setData({ attrs, refresh: true });
      });
    }
    this.setData({ attrs });
  },
  onShareAppMessage() {
    return {
      title: 'Textarea 文本域',
      path: 'pages/textarea/index'
    };
  }
});
