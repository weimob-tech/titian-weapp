import icons from './config';

Page({
  data: {
    icons,
    active: 0,
    size: 48,
    options: [
      {
        type: 'radio',
        desc: '模式',
        key: 'mode',
        name: 'Mode',
        value: 'mono',
        list: [
          {
            label: '单色',
            value: 'mono',
            attr: {
              iconGroup: ['tabbar-home', 'tabbar-category', 'tabbar-cart', 'tabbar-mine']
            },
            hiddenItems: ['color1', 'color2']
          },
          {
            label: '双色',
            value: 'colors',
            attr: { iconGroup: ['close-double'] },
            hiddenItems: ['color']
          }
        ]
      },
      {
        type: 'color',
        name: 'color',
        key: 'color',
        desc: '颜色',
        value: '#fa2c19'
      },
      {
        type: 'color',
        name: 'color',
        key: 'color1',
        desc: '颜色1',
        value: '#ffa300'
      },
      {
        type: 'color',
        name: 'color',
        key: 'color2',
        desc: '颜色2',
        value: '#2a6ae9'
      },
      {
        type: 'radius',
        name: 'Size',
        key: 'size',
        desc: '尺寸',
        value: 36,
        min: 20,
        max: 56
      },
      {
        type: 'radius',
        name: 'Rotate',
        key: 'rotate',
        desc: '旋转',
        value: 0,
        max: 360
      },
      {
        type: 'radio',
        desc: '旋转动画',
        key: 'spin',
        name: 'Circulate',
        value: false,
        list: [
          {
            label: '关闭',
            value: false
          },
          {
            label: '开启',
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
  onSwitch(event) {
    this.setData({
      active: event.detail.index
    });
  },
  onClick(e) {
    const { name } = e.target.dataset;
    if (!name) {
      return;
    }
    wx.setClipboardData({
      data: name,
      success() {
        wx.getClipboardData({
          success(res) {
            // eslint-disable-next-line no-console
            console.log(res.data); // data
          }
        });
      }
    });
  },
  onShareAppMessage() {
    return {
      title: 'Icon 图标',
      path: 'pages/icon/index'
    };
  }
});
