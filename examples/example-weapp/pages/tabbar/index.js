// pages/tabbar/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    options1: [
      {
        icon: 'home',
        title: '首页'
      },
      {
        icon: 'arrange',
        title: '分类'
      },
      {
        icon: 'cart',
        title: '购物车'
      },
      {
        icon: 'user-account-setting',
        title: '我的'
      }
    ],

    options2: [
      {
        icon: 'home',
        title: '首页',
        value: 'first'
      },
      {
        icon: 'arrange',
        title: '分类',
        value: 'second'
      },
      {
        icon: 'cart',
        title: '购物车',
        value: 'third'
      },
      {
        icon: 'user-account-setting',
        title: '我的',
        value: 'fourth'
      }
    ],
    options: [
      {
        key: 'count',
        type: 'radio',
        name: 'Number',
        desc: '数量',
        list: [
          {
            label: '4个',
            value: 4,
            attr: {
              group: [
                { icon: 'home', title: '首页' },
                { icon: 'arrange', title: '分类' },
                { icon: 'cart', title: '购物车' },
                { icon: 'user-account-setting', title: '我的' }
              ]
            }
          },
          {
            label: '5个',
            value: 5,
            attr: {
              group: [
                { icon: 'home', title: '首页' },
                { icon: 'arrange', title: '分类' },
                { icon: 'cart', title: '购物车' },
                { icon: 'user-account-setting', title: '我的' },
                { icon: 'home', title: '首页' }
              ]
            }
          }
        ],
        value: 5
      },
      {
        type: 'color',
        name: 'color',
        key: 'color',
        desc: '颜色 ',
        value: '#fa2c19'
      },
      {
        key: 'separation',
        type: 'radio',
        name: 'Divide',
        desc: '上滑分割',
        list: [
          { label: '无', value: '' },
          { label: '线分割', value: 'border' },
          { label: '投影分割', value: 'shadow' }
        ],
        value: ''
      }
    ],
    attr: null
  },
  onSelect(e) {
    const value = e.detail;
    wx.showToast({
      icon: 'none',
      title: `${value}`
    });
  },
  onChange(e) {
    // eslint-disable-next-line no-console
    console.log(e.detail);
    this.setData({ attr: e.detail });
  },
  onShareAppMessage() {
    return {
      title: 'Tabbar 标签栏',
      path: 'pages/tabbar/index'
    };
  }
});
