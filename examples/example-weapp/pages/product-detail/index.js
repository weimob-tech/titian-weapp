Page({
  data: {
    navigationBarHeight: '',
    statusBarHeight: ''
  },
  onReady() {
    this.navBarAnimation();
  },
  navBarAnimation() {
    const sysInfo = wx.getSystemInfoSync();
    const menuInfo = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navigationBarHeight: (menuInfo.top - sysInfo.statusBarHeight) * 2 + menuInfo.height,
      statusBarHeight: sysInfo.statusBarHeight
    });
    this.animate('.navigation-bar', [{ opacity: '0' }, { opacity: '1' }], 100, {
      scrollSource: '#scroller',
      timeRange: 100,
      startScrollOffset: 300,
      endScrollOffset: 340
    });
  }
});
