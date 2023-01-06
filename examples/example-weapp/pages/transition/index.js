// pages/transition/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    name: 'fade',
    showEnd: true
  },
  toggleShow() {
    this.setData({ show: !this.data.show, showEnd: false });
    setTimeout(() => {
      this.setData({ show: !this.data.show });
      setTimeout(() => {
        this.setData({ showEnd: true });
      }, 500);
    }, 1000);
  },
  changeName(event) {
    if (!this.data.showEnd) {
      return;
    }

    const name = event.target.dataset.name || 'fade';
    this.setData({ name }, () => {
      this.toggleShow();
    });
  },
  onEnter() {
    console.log('onEnter');
  },
  onEntering() {
    console.log('onEntering');
  },
  onEntered() {
    console.log('onEntered');
  },
  onExit() {
    console.log('onExit');
  },
  onExiting() {
    console.log('onExiting');
  },
  onExited() {
    console.log('onExited');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('show', this.data.show);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
});
