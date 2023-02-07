Page({
  data: {
    active: 0,
    size: 48,
    options: [
      {
        type: 'radio',
        desc: '模式',
        key: 'variant',
        name: 'Mode',
        value: 'with-confirm',
        list: [
          {
            label: 'with-confirm',
            value: 'with-confirm'
          },
          {
            label: 'cancel-only',
            value: 'cancel-only'
          },
          {
            label: 'back-cancel',
            value: 'back-cancel'
          },
          {
            label: 'mini-close',
            value: 'mini-close'
          },
          {
            label: 'space-between',
            value: 'space-between'
          }
        ]
      },
      {
        type: 'radio',
        desc: '模式',
        key: 'subtitle',
        name: 'Subtitle',
        value: true,
        list: [
          {
            label: '无',
            value: false
          },
          {
            label: '有副标题',
            value: true
          }
        ]
      }
    ],
    attrs: null
  },
  onChange(e) {
    const attrs = e.detail;
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    this.setData({ attrs });
  },
  onConfirm() {
    console.log('onConfirm');
  },
  onClose() {
    console.log('onClose');
  },
  onCancel() {
    console.log('onCancel');
  },
  onBack() {
    console.log('onBack');
  },
  onShareAppMessage() {
    return {
      title: 'Popup Titlebar 弹出层标题',
      path: 'pages/popup-titlebar/index'
    };
  }
});
