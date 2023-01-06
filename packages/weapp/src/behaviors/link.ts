export type JumpType = 'redirectTo';
const link = Behavior({
  properties: {
    // 跳转路径
    link: String,

    // 跳转方式
    jumpType: {
      type: String,
      value: 'navigateTo'
    }
  },
  methods: {
    jumpToLink() {
      const { link: url, jumpType } = this.data;
      if (url) {
        if (jumpType === 'navigateTo' && getCurrentPages().length > 9) {
          wx.redirectTo({ url }).then((r) => r);
          return;
        }
        const fn = wx[jumpType as JumpType];
        fn({ url });
      }
    }
  }
});

export default link;
