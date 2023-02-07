Page({
  onShareAppMessage() {
    return {
      title: 'Tag 标签',
      path: 'pages/tag/index'
    };
  },
  data: {
    attrs: {},
    options: [
      {
        type: 'radio',
        name: 'Style',
        key: 'styleType',
        desc: '风格',
        value: 0,
        list: [
          {
            value: 0,
            label: '潮流',
            attr: {
              cssVariable: '--base-radius-size: -999rpx; --capsule-radius-size: -999rpx;'
            }
          },
          {
            value: 1,
            label: '通用',
            attr: {
              cssVariable: '--base-radius-size: 0rpx; --capsule-radius-size: 0rpx;'
            }
          },
          {
            value: 2,
            label: '可爱',
            attr: {
              cssVariable: '--base-radius-size: 8rpx; --capsule-radius-size: 999rpx;'
            }
          }
        ]
      },
      {
        type: 'radio',
        name: 'Mode',
        key: 'variant',
        desc: '模式 ',
        list: [
          { value: 'contained', label: '面性强调', attr: { text: '面性强调' } },
          { value: 'filled', label: '面性次要', attr: { text: '面性次要' } },
          { value: 'outlined', label: '线性按钮', attr: { text: '线性强调' } }
        ],
        value: 'contained'
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
        name: 'TagShape',
        key: 'shape',
        desc: '形状 ',
        list: [
          { value: 'normal', label: '常规' },
          { value: 'coupon', label: '优惠券' }
        ],
        value: 'normal'
      },
      {
        type: 'radio',
        name: 'icon',
        key: 'icon',
        desc: '图标',
        value: 'none',
        list: [
          { value: 'none', label: '无', attr: { leftIcon: '', rightIcon: '' } },
          {
            value: 'leftIcon',
            label: '左图标',
            attr: { leftIcon: 'home', rightIcon: '' }
          },
          {
            value: 'rightIcon',
            label: '右图标',
            attr: { leftIcon: '', rightIcon: 'arrow-right' }
          },
          {
            value: 'leftRightIcon',
            label: '左右图标',
            attr: { leftIcon: 'home', rightIcon: 'arrow-right' }
          }
        ]
      },
      {
        type: 'radio',
        name: 'size',
        key: 'size',
        list: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'big', label: 'Big' }
        ],
        desc: '规格',
        value: 'medium'
      }
    ]
  },

  onChange(e) {
    const { detail } = e;
    // --s: 1是通用型，0是潮流型，2是可爱型

    this.setData({ attrs: { text: '按钮', ...detail } });
  }
});
