const STATE = { START: 'start', PAUSE: 'pause' };

Page({
  onShareAppMessage() {
    return {
      title: 'CountDown 倒计时',
      path: 'pages/countdown/index'
    };
  },
  data: {
    state: STATE.PAUSE,
    attrs: {},
    options: [
      {
        type: 'radio',
        name: 'Mode',
        key: 'mode',
        desc: '模式 ',
        value: 'number',
        list: [
          { value: 'number', label: '数字' },
          {
            value: 'module',
            label: '模块',
            attr: { useSlot: true }
          }
        ]
      },
      {
        type: 'color',
        name: 'color',
        key: 'color',
        desc: '颜色 ',
        value: '#fa2c19'
      },
      {
        type: 'radio',
        name: 'Day',
        key: 'day',
        desc: '天数',
        value: false,
        list: [
          { value: false, label: '无' },
          { value: true, label: '有', attr: { format: 'DD 天 HH : mm : ss' } }
        ]
      },
      {
        type: 'radio',
        name: 'Millisecond',
        key: 'second',
        desc: '毫秒',
        value: false,
        list: [
          { value: false, label: '无' },
          { value: true, label: '有', attr: { format: 'HH : mm : ss SSS' } }
        ]
      }
    ]
  },

  onStart() {
    const countDown = this.selectComponent('.control-count-down');
    this.setData({ state: STATE.START });
    countDown.start();
  },

  onPause() {
    const countDown = this.selectComponent('.control-count-down');
    this.setData({ state: STATE.PAUSE });
    countDown.pause();
  },

  onReset() {
    const countDown = this.selectComponent('.control-count-down');
    this.setData({ state: STATE.START });
    countDown.reset();
    countDown.start();
  },

  timeChange(e) {
    this.setData({ time: e.detail });
  },
  hexToRGB(hex, a) {
    let alpha = false;
    let h = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (h.length === 3) {
      h = [...h].map((x) => x + x).join('');
    } else if (h.length === 8) {
      alpha = true;
    } else if (h.length === 6) {
      // do nothing
    } else {
      return hex;
    }
    h = parseInt(h, 16);
    const isAlpha = alpha || a;
    // eslint-disable-next-line no-bitwise
    a = a || `${h & 255}`;
    // eslint-disable-next-line no-bitwise
    return `rgb${isAlpha ? 'a' : ''}(${h >>> (alpha ? 24 : 16)}, ${
      // eslint-disable-next-line no-bitwise
      (h & (alpha ? 16711680 : 65280)) >>> (alpha ? 16 : 8)
      // eslint-disable-next-line no-bitwise
    }, ${(h & (alpha ? 65280 : 255)) >>> (alpha ? 8 : 0)}${isAlpha ? `, ${a}` : ''})`;
  },
  onChange(e) {
    const { detail } = e;
    this.setData(
      {
        reload: true
      },
      () => {
        if (detail.second && detail.day) {
          detail.format = 'DD 天 HH : mm : ss SSS';
        }
        this.setData({
          reload: false,
          state: STATE.PAUSE,
          attrs: {
            format: 'HH : mm : ss',
            ...detail,
            bgColor: this.hexToRGB(detail.color || '#fa2c19', 0.1)
          }
        });
      }
    );
  }
});
