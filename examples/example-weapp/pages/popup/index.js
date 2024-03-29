import { mergeOptionIntoAttrs } from '../../util/index';

Page({
  data: {
    visible: false,
    options: [
      {
        desc: '位置',
        key: 'position',
        type: 'radio',
        name: 'Position',
        list: [
          {
            label: '居中',
            value: 1,
            property: { position: 'center' },
            hiddenItems: ['title', 'subTitle']
          },
          { label: '底部', value: 2, property: { position: 'bottom' } },
          {
            label: '左侧',
            value: 3,
            property: { position: 'left' },
            hiddenItems: ['title', 'subTitle']
          },
          {
            label: '右侧',
            value: 4,
            property: { position: 'right' },
            hiddenItems: ['title', 'subTitle']
          }
        ],
        value: 1
      },
      {
        desc: '运动',
        key: 'transition',
        type: 'radio',
        name: 'Transition',
        list: [
          { label: 'Zoom', value: 'zoom' },
          { label: 'Fade', value: 'fade' },
          { label: 'fade up', value: 'fade-up' },
          { label: 'fade down', value: 'fade-down' },
          { label: 'fade left', value: 'fade-left' },
          { label: 'fade right', value: 'fade-right' },
          { label: 'slide up', value: 'slide-up' },
          { label: 'slide down', value: 'slide-down' },
          { label: 'slide left', value: 'slide-left' },
          { label: 'slide right', value: 'slide-right' }
        ],
        value: 'zoom'
      },
      {
        desc: '标题栏',
        key: 'title',
        type: 'radio',
        name: 'Title',
        list: [
          { label: '无', value: 1, property: {}, hiddenItems: ['subTitle'] },
          {
            label: '标题+仅取消',
            value: 2,
            property: { title: '上拉窗标题栏', variant: 'cancel-only' }
          },
          {
            label: '标题+确认取消',
            value: 3,
            property: { title: '上拉窗标题栏', variant: 'with-confirm' }
          },
          {
            label: '仅关闭',
            value: 4,
            property: { title: '上拉窗标题栏', variant: 'mini-close' }
          }
        ],
        value: 1
      },
      {
        desc: '副标题',
        key: 'subTitle',
        type: 'radio',
        name: 'Subhead',
        list: [
          { label: '无', value: 1, property: { subTitle: '' } },
          { label: '有', value: 2, property: { subTitle: '我是副标题' } }
        ],
        value: 1
      },
      {
        desc: '滚动穿透',
        key: 'preventScroll',
        type: 'radio',
        name: 'PreventScroll',
        list: [
          { label: '是', value: 1, property: { preventScroll: true } },
          { label: '否', value: 2, property: { preventScroll: false } }
        ],
        value: 2
      },
      {
        key: 'radius',
        type: 'radius',
        name: 'Radius',
        desc: '圆角',
        value: 16,
        max: 42
      }
    ],
    attr: {}
  },
  onChange(event) {
    const { options } = this.data;
    const attr = event.detail;
    const afterAttr = mergeOptionIntoAttrs(options, attr);
    this.setData({
      attr: { ...afterAttr, closeOnMask: true }
    });
  },
  onClick() {
    this.setData({
      visible: true
    });
  },
  onClose() {
    this.setData({
      visible: false
    });
  },
  onShareAppMessage() {
    return {
      title: 'Popup 弹出层',
      path: 'pages/popup/index'
    };
  }
});
