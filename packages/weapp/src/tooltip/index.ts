import BasicComponent from '../common/basic/BasicComponent';

enum ArrowIconNameEnum {
  Left = 'tooltipsarrow-left',
  Right = 'tooltipsarrow-right',
  Center = 'tooltipsarrow-mid'
}

BasicComponent({
  options: {
    virtualHost: true
  },
  externalClasses: ['ext-content-class', 'ext-inner-class'],
  properties: {
    visible: {
      type: null,
      value: null
    },
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
    iconName: '',
    isLeft: false,
    isRight: false
  },
  methods: {
    open() {
      if (typeof this.data.visible !== 'boolean') {
        this.calculate(() => {
          this.setData({ vis: true });
        });
      }
    },
    close() {
      if (typeof this.data.visible !== 'boolean') {
        this.setData({ vis: false });
      } else if (this.data.closeOnClick && this.data.visible) {
        this.triggerEvent('close');
      }
    },
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

          let iconName: string;
          let arrayLeft = 0;
          if (isLeft || isRight) {
            if (isLeft) {
              arrayLeft = (arrowRect.width / 2) * -1;
            } else {
              arrayLeft = contentRect.width - arrowRect.width / 2;
            }
          } else {
            arrayLeft = hostRect.left + hostRect.width / 2 - left - arrowRect.width / 2;
          }
          let top = 0;
          let down = direction === 'top';
          if (direction === 'top') {
            if (contentRect.height + arrowRect.height > hostRect.top) {
              top = hostRect.top + hostRect.height + arrowRect.height;
              down = false;
            } else {
              top = hostRect.top - contentRect.height - arrowRect.height;
            }
          } else if (sysHeight - hostRect.bottom < contentRect.height + arrowRect.height) {
            top = hostRect.top - contentRect.height - arrowRect.height;
            down = true;
          } else {
            top = hostRect.top + hostRect.height + arrowRect.height;
          }
          if (isLeft) {
            iconName = ArrowIconNameEnum.Left;
          } else if (isRight) {
            iconName = ArrowIconNameEnum.Right;
          } else {
            iconName = ArrowIconNameEnum.Center;
          }

          this.setData(
            {
              down,
              top,
              left,
              arrayLeft,
              iconName,
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
    },
    attached() {
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      const pageScroll = page?.onPageScroll?.bind(page);

      page.onPageScroll = (e) => {
        if (e) {
          this.close();
        }
        if (pageScroll) {
          pageScroll(e);
        }
      };
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
