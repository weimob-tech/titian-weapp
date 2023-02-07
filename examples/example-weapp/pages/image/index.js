const successUrl = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png?';
const failUrl = 'https://cdn2.weimob.com/saas/assets/images/a.jpg';
Page({
  data: {
    attrs: {},
    options: [
      {
        type: 'radio',
        name: 'Mode',
        desc: '状态',
        key: 'selectMode',
        value: 'normal',
        list: [
          {
            value: 'normal',
            label: '正常',
            attr: {
              loadingIcon: 'default-pic',
              src: successUrl
            },
            hiddenItems: ['loadingSlot', 'errorSlot']
          },
          {
            value: 'loading',
            label: '加载中',
            attr: {
              src: `${successUrl}b`
            },
            hiddenItems: ['errorSlot']
          },
          {
            value: 'error',
            label: '加载失败',
            hiddenItems: ['mode', 'loadingSlot', 'radius'],
            attr: { errorIcon: 'default-pic', src: failUrl }
          }
        ]
      },
      {
        type: 'radio',
        name: 'Style',
        key: 'loadingSlot',
        desc: '样式',
        value: 'image',
        attr: { random: () => Math.random() },
        list: [
          {
            value: 'image',
            label: '图片',
            attr: {
              loadingIcon: 'default-pic'
            }
          },
          {
            value: 'icon',
            label: '图标',
            attr: {
              loadingIcon: 'right'
            }
          },
          {
            value: 'loading',
            label: '加载',
            attr: {
              useLoadingSlot: true,
              slotName: 'loading'
            }
          },
          {
            value: 'text',
            label: '文字',
            attr: {
              useLoadingSlot: true,
              slotName: 'text'
            }
          }
        ]
      },
      {
        type: 'radio',
        name: 'Style',
        key: 'errorSlot',
        desc: '样式',
        value: 'icon',
        attr: { random: () => Math.random() },
        list: [
          {
            value: 'image',
            label: '图片'
          },
          {
            value: 'icon',
            label: '图标',
            attr: {
              errorIcon: 'close'
            }
          },
          {
            value: 'text',
            label: '文字',
            attr: {
              useErrorSlot: true,
              slotName: 'error'
            }
          }
        ]
      },
      {
        type: 'radio',
        name: 'Fill Mode',
        key: 'mode',
        desc: '填充 ',
        list: [
          { value: 'cover', label: 'Cover' },
          { value: 'none', label: 'None' },
          { value: 'contain', label: 'Contain' },
          { value: 'scaleToFill', label: 'Fill' },
          { value: 'scaleDown', label: 'Scale Down' }
        ],
        value: 'cover'
      },
      {
        type: 'radius',
        name: 'Radius',
        key: 'radius',
        desc: '圆角',
        value: 16
      }
    ]
  },
  onChange(e) {
    const { detail } = e;
    let src = '';
    if (detail.src) {
      src = detail.src;
    }
    if (detail.random && detail.loadingSlot !== this.data.attrs.loadingSlot) {
      src = detail.errorSlot ? failUrl : successUrl;
      src += Math.random().toString(36).slice(2);
    }
    if (detail.errorSlot !== this.data.attrs.errorSlot) {
      src += Math.random().toString(36).slice(2);
    }
    this.setData({ attrs: { ...detail, src } });
  },
  onShareAppMessage() {
    return {
      title: 'Image 图片',
      path: 'pages/image/index'
    };
  }
});
