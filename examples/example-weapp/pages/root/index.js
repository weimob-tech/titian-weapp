const config = require('../../config');

Page({
  data: {
    showBackTop: false,
    list: config,
    navigationBarHeight: '',
    statusBarHeight: '',
    scrollTop: 0
  },
  onReady() {
    this.navBarAnimation();
  },
  scrollHandle(e) {
    if (e.detail.scrollTop > 150 && !this.data.showBackTop) {
      this.setData({ showBackTop: true });
    } else if (e.detail.scrollTop <= 150 && this.data.showBackTop) {
      this.setData({ showBackTop: false });
    }
  },
  navBarAnimation() {
    const sysInfo = wx.getSystemInfoSync();
    const menuInfo = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navigationBarHeight: (menuInfo.top - sysInfo.statusBarHeight) * 2 + menuInfo.height,
      statusBarHeight: sysInfo.statusBarHeight
    });
    // #ifdef MP-WEIXIN
    this.animate('.navigation-bar', [{ opacity: '0' }, { opacity: '1' }], 100, {
      scrollSource: '#scroller',
      timeRange: 100,
      startScrollOffset: 300,
      endScrollOffset: 340
    });
    // #endif
  },
  onShareAppMessage() {
    return {
      title: 'Titian UI 组件库',
      path: 'pages/root/index'
    };
  },
  handleBackTopClick() {
    this.setData({
      scrollTop: 0,
      showBackTop: false
    });
  }
});
