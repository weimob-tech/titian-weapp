import BasicComponent from '../common/basic/BasicComponent';

enum ArrowPathEnum {
  DownLeft = `M 0 0  0 12 L 8 4 C 10.5 2 15.5 0 18 0`,

  DownRight = `M 0 0 C 2.5 0 7.5 2 10 4 L 18 12 18 0`,
  DownCenter = `M 0 0  C 2.5 0  7.5  2 10 4 L 18 12 26 4 C 28.5 2  33.5 0  36 0`,

  UpLeft = `M 0 12 0 0 L 8 8 C 10.5 10 15.5 12 18 12`,

  UpRight = `M 0 12 C 2.5 12 7.5 10 10 8 L 18 0  18 12`,
  UpCenter = `M 0 12 C 2.5 12 7.5 10 10 8 L 18 0  26 8 C 28.5 10 33.5 12 36 12`
}

BasicComponent({
  options: {
    virtualHost: true
  },
  externalClasses: ['ext-content-class', 'ext-inner-class'],
  properties: {
    visible: Boolean,
    content: String,
    direction: {
      type: String,
      value: 'bottom'
    },
    size: {
      type: Number,
      value: 24
    },
    closeOnClick: Boolean,
    extStyle: String
  },
  data: {
    top: 0,
    left: 0,
    arrayLeft: 0,
    down: true,
    vis: false,
    clipPath: '',
    isLeft: false,
    isRight: false
  },
  methods: {
    open() {
      if (this.data.closeOnClick) {
        this.setData({
          visible: true
        });
      }
    },
    close() {
      if (this.data.closeOnClick) {
        this.setData({
          visible: false
        });
      }
    },
    noop() {},
    // eslint-disable-next-line class-methods-use-this
    getLocation(
      hostRect: WechatMiniprogram.BoundingClientRectCallbackResult,
      arrowRect: WechatMiniprogram.BoundingClientRectCallbackResult,
      contentRect: WechatMiniprogram.BoundingClientRectCallbackResult,
      sysWidth: number
    ) {
      const direction = hostRect.left < Math.abs(sysWidth - hostRect.right);
      const isLeft = Number((hostRect.left + hostRect.width / 2 - arrowRect.width / 2).toFixed(0)) <= 0;
      const isRight = Number((sysWidth - (hostRect.left + hostRect.width / 2 + arrowRect.width / 2)).toFixed(0)) <= 0;
      // 贴左
      if (isLeft) {
        return {
          isLeft,
          isRight,
          left: hostRect.left + hostRect.width / 2
        };
      }
      // 贴右
      if (isRight) {
        return {
          isLeft,
          isRight,
          left: hostRect.left + hostRect.width / 2 - contentRect.width
        };
      }
      // 偏左
      if (direction) {
        if (hostRect.left + hostRect.width / 2 > contentRect.width / 2) {
          return {
            isLeft,
            isRight,
            left: hostRect.left + hostRect.width / 2 - contentRect.width / 2
          };
        }
        return { isLeft, isRight, left: hostRect.left };
      }
      // 偏右
      if (sysWidth - hostRect.right + hostRect.width / 2 > contentRect.width / 2) {
        return {
          isLeft,
          isRight,
          left: hostRect.left + hostRect.width / 2 - contentRect.width / 2
        };
      }
      return {
        isLeft,
        isRight,
        left: hostRect.right - contentRect.width
      };
    },
    calculate(cb?: () => void) {
      const { direction } = this.data;
      const query = this.createSelectorQuery().in(this);
      const sysWidth = wx.getSystemInfoSync().windowWidth;
      const sysHeight = wx.getSystemInfoSync().windowHeight;
      query
        .select('.titian-tooltip')
        .fields({ size: true, rect: true })
        .select('.titian-tooltip-content')
        .fields({ size: true, computedStyle: ['borderRadius'] })
        .select('.titian-tooltip-arrow')
        .fields({ size: true })
        .exec(([hostRect, contentRect, arrowRect]) => {
          if (!hostRect || !contentRect || !arrowRect) {
            return;
          }
          const { isLeft, isRight, left } = this.getLocation(hostRect, arrowRect, contentRect, sysWidth);

          let clipPath: string;
          let arrayLeft = 0;
          if (isLeft || isRight) {
            if (isLeft) {
              arrayLeft = (arrowRect.width / 2) * -1;
            } else {
              arrayLeft = contentRect.width / 2 - arrowRect.width / 2;
            }
          } else {
            arrayLeft = hostRect.left + hostRect.width / 2 - left - arrowRect.width / 2;
          }
          let top = 0;
          let down = direction === 'top';
          if (direction === 'top') {
            if (contentRect.height + arrowRect.height > hostRect.top) {
              top = hostRect.height + arrowRect.height;
              down = false;
            } else {
              top = 0 - contentRect.height - arrowRect.height;
            }
          } else if (sysHeight - hostRect.bottom < contentRect.height + arrowRect.height) {
            top = 0 - contentRect.height - arrowRect.height;
            down = true;
          } else {
            top = hostRect.height + arrowRect.height;
          }
          if (down) {
            if (isLeft) {
              clipPath = ArrowPathEnum.DownLeft; // `M 18 0  18 12 L 26 4 C 28.5 2 33.5 0 36 0`;
            } else if (isRight) {
              clipPath = ArrowPathEnum.DownRight; // `M 0 0 C 2.5 0 7.5 2 10 4 L 18 12 18 0`;
            } else {
              clipPath = ArrowPathEnum.DownCenter; // `M 0 0  C 2.5 0  7.5  2 10 4 L 18 12 26 4 C 28.5 2  33.5 0  36 0`;
            }
          } else if (isLeft) {
            clipPath = ArrowPathEnum.UpLeft; // `M 18 12 18 0 L 26 8 C 28.5 10 33.5 12 36 12`;
          } else if (isRight) {
            clipPath = ArrowPathEnum.UpRight; // `M 0 12 C 2.5 12 7.5 10 10 8 L 18 0  18 12`;
          } else {
            clipPath = ArrowPathEnum.UpCenter; // `M 0 12 C 2.5 12 7.5 10 10 8 L 18 0  26 8 C 28.5 10 33.5 12 36 12`;
          }
          this.setData(
            {
              down,
              top,
              left: arrowRect.width / 2 - arrayLeft,
              arrayLeft,
              clipPath,
              isLeft,
              isRight
            },
            cb
          );
        });
    }
  },
  lifetimes: {
    ready() {
      this.calculate();
    }
  },
  observers: {
    visible(vis: boolean) {
      if (this.vis === vis) {
        return;
      }
      this.vis = vis;
      this.calculate(() => {
        this.setData({ vis });
      });
    }
  }
});
